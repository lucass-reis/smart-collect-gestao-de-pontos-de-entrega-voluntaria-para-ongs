import { zodResolver } from '@hookform/resolvers/zod';
import * as Toast from '@radix-ui/react-toast';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import { logout } from '../../utils/auth.js';
import styles from './CollectionPoints.module.css';
import Header from '../../components/Header/Header.jsx';

// Firebase
import { addDoc, arrayUnion, collection, doc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase.js';
import { getAuth } from 'firebase/auth';
import { useOng } from '../../context/OngContext.jsx';

const PEVSchema = z.object({
  PEVId: z.string().nonempty("O campo é obrigatório!").min(2, "O código do PEV precisar ter ao menos 2 caracteres"),
  name: z.string().nonempty("O campo é obrigatório!").min(3, "O nome precisar ter ao menos 3 caracteres"),
  zipCode: z.string().nonempty("O campo é obrigatório!"),
  address: z.string().nonempty("O campo é obrigatório!").min(5, "O endereço precisar ter ao menos 5 caracteres"),
  PEVPassword: z.string().nonempty("O campo é obrigatório!").min(8, "A senha do PEV deve ter ao menos 8 caracteres"),
});

export default function CollectionPoints() {
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const { ong } = useOng();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(PEVSchema)
  });

  // Real-time listener do Firestore
  useEffect(() => {
    const q = query(collection(db, "collectionPoints"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const points = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(point => {
        return point.owner === getAuth().currentUser?.uid;
      });
      setCollectionPoints(points);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    logout();
    navigate('/login');
  };

  const onSubmit = async (data) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        alert("401 - Unauthorized");
        return;
      }

      const pevRef = await addDoc(collection(db, "collectionPoints"), {
        ...data,
        owner: user.uid,
        createdAt: new Date()
      });

      const q = query(
        collection(db, "ongs"),
        where("owner", "==", ong.owner)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.error("Nenhuma ONG encontrada para este owner.");
        return;
      }

      // pega o primeiro documento encontrado
      const ongDoc = snapshot.docs[0];

      // cria referência ao documento da ONG
      const ongRef = doc(db, "ongs", ongDoc.id);

      // atualiza o array 'pevs'
      await updateDoc(ongRef, {
        pevs: arrayUnion(pevRef)
      });

      setToastOpen(true);
      setIsDialogOpen(false);
      reset();
    } catch (err) {
      console.error("Erro ao cadastrar PEV:", err);
    }
  };

  const handleGoToCollectionStatus = (point) => {
    navigate(`/collection-status/${point.id}`, { state: { point } });
  }

  const handleAddPoint = () => setIsDialogOpen(true);
  const handleViewStatus = () => navigate('/collection-status');
  const handleProfile = () => navigate('/view-profile');

  return (
    <Toast.Provider swipeDirection="right">
      <div className={styles.container}>
        <Header>
          <li><a onClick={handleProfile}>Perfil</a></li>
          <li>
            <a onClick={handleViewStatus}>
              Ver Status
            </a>
          </li>
          <li>
            <a onClick={handleLogout}>
              Sair
            </a>
          </li>
        </Header>

        <main className={styles.main}>
          <div className={styles.content}>
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Dialog.Content maxWidth="500px" asChild>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Flex gap="3" mt="4" justify="end">
                    <Dialog.Title>
                      Adicione um PEV (Ponto de Entrega Voluntária)
                    </Dialog.Title>
                    <Dialog.Close>
                      <Button variant="soft" color="red">
                        X
                      </Button>
                    </Dialog.Close>
                  </Flex>
                  <Dialog.Description>
                    Adicione um PEV para o monitoramento eficiente
                  </Dialog.Description>
                  <Flex direction="column" gap="3" className={styles.dialogContent}>
                    <label className={styles.inputStyle}>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Código do PEV
                      </Text>
                      <TextField.Root placeholder="Digite código cadastrado no momento da instalação do PEV" {...register("PEVId")} />
                      {errors.PEVId && <span className={styles.errorMessage}>{errors.PEVId.message}</span>}
                    </label>
                    <label className={styles.inputStyle}>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Nome
                      </Text>
                      <TextField.Root placeholder="Digite um apelido para esse PEV" {...register("name")} />
                      {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
                    </label>
                    <label className={styles.inputStyle}>
                      <Text as="div" size="2" mb="1" weight="bold">
                        CEP
                      </Text>
                      <TextField.Root placeholder="Digite o local aproximado onde o PEV ficará" {...register("zipCode")} />
                      {errors.zipCode && <span className={styles.errorMessage}>{errors.zipCode.message}</span>}
                    </label>
                    <label className={styles.inputStyle}>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Endereço
                      </Text>
                      <TextField.Root placeholder="Digite o endereço do PEV" {...register("address")} />
                      {errors.address && <span className={styles.errorMessage}>{errors.address.message}</span>}
                    </label>
                    <label className={styles.inputStyle}>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Senha
                      </Text>
                      <TextField.Root type='password' maxLength={14} placeholder="Digite a senha de desbloqueio do dispositivo do PEV" {...register("PEVPassword")} />
                      {errors.PEVPassword && <span className={styles.errorMessage}>{errors.PEVPassword.message}</span>}
                    </label>
                    <Flex justify="end" className={styles.dialogContent}>
                      <Button variant="soft" color="mint" type="submit">
                        Adicionar
                      </Button>
                    </Flex>
                  </Flex>
                </form>
              </Dialog.Content>
              <div className={styles.pageHeader}>
                <h2>Meus Pontos de Coleta</h2>
                <button onClick={handleAddPoint} className={styles.primaryAddButton}>
                  Adicionar ponto
                </button>
              </div>
              {collectionPoints.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <svg viewBox="0 0 64 64" fill="none">
                      <circle cx="32" cy="32" r="30" stroke="#43B02A" strokeWidth="4"/>
                      <path d="M20 32l8 8 16-16" stroke="#43B02A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Nenhum ponto de coleta encontrado</h3>
                  <p>Sua conta é recente, clique no botão abaixo para adicionar seu primeiro ponto de coleta.</p>
                  <button onClick={handleAddPoint} className={styles.primaryAddButton}>
                    Adicionar Primeiro Ponto
                  </button>
                </div>
              ) : (
                <div className={styles.pointsList}>
                  {collectionPoints.map((point) => (
                    <div onClick={() => handleGoToCollectionStatus(point)} key={point.id} className={styles.pointCard}>
                      <h3>{point.name}</h3>
                      <p>{point.address}</p>
                    </div>
                  ))}
                </div>
              )}
            </Dialog.Root>
          </div>
        </main>
      </div>

      {/* TOAST */}
      <Toast.Root open={toastOpen} onOpenChange={setToastOpen} duration={3000} className={styles.toast}>
        <Toast.Title className={styles.toastTitle}>PEV cadastrado!</Toast.Title>
        <Toast.Description className={styles.toastDescription}>
          Seu ponto de coleta foi adicionado com sucesso.
        </Toast.Description>
      </Toast.Root>

      {/* Viewport obrigatoriamente no fim */}
      <Toast.Viewport className={styles.toastViewport} />
    </Toast.Provider>
  );
}