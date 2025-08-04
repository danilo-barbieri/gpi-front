import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";

const cargos = [
  "Comandante",
  "Subcomandante",
  "Major",
  "Capitão",
  "Tenente",
  "Sargento",
  "Cabo",
  "Soldado",
];

export default function NovoAgenteModal({ isOpen, onClose, onSave }) {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [grupamento, setGrupamento] = useState("");

  const salvarAgente = async () => {
    try {
      await axios.post("http://localhost:3000/agentes", {
        nome,
        cargo,
        grupamento,
      });
      onSave(); // atualiza lista
      onClose(); // fecha modal
      setNome("");
      setCargo("");
      setGrupamento("");
    } catch (error) {
      console.error("Erro ao adicionar agente:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalHeader>Adicionar Novo Oficial</ModalHeader>
      <ModalBody className="space-y-4">
        <Input label="Nome do Agente" value={nome} onChange={(e) => setNome(e.target.value)} isRequired />
        <Select label="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} isRequired>
          {cargos.map((cargo) => (
            <SelectItem key={cargo} value={cargo}>
              {cargo}
            </SelectItem>
          ))}
        </Select>
        <Input label="Grupamento" value={grupamento} onChange={(e) => setGrupamento(e.target.value)} placeholder="Ex: Alfa, Bravo, Charlie..." />
      </ModalBody>
      <ModalFooter>
        <Button variant="light" onClick={onClose}>Cancelar</Button>
        <Button color="primary" onClick={salvarAgente} isDisabled={!nome || !cargo}>
          Salvar
        </Button>
      </ModalFooter>
    </Modal>
  );
}
