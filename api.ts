const API_URL = 'https://backend-chat-jfqq.onrender.com';

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  agentName?: string;
  createdAt: string;
}

export interface Conversation {
  id: number;
  userName?: string;
  userPhone?: string;
  messages?: Message[];
  status: 'open' | 'closed';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

// Obtener todas las conversaciones
export const getConversations = async (): Promise<Conversation[]> => {
  const res = await fetch(`${API_URL}/api/conversations`);
  if (!res.ok) throw new Error('Error al cargar conversaciones');
  return res.json();
};

// Crear una nueva conversación (PIDE userName Y userPhone)
export const createConversation = async (userName: string, userPhone: string = ''): Promise<Conversation> => {
  const res = await fetch(`${API_URL}/api/conversations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, userPhone }),
  });
  if (!res.ok) throw new Error('Error al crear conversación');
  return res.json();
};

// Enviar un mensaje
export const sendMessage = async (conversationId: number, text: string, sender: 'user' | 'agent'): Promise<Message> => {
  const res = await fetch(`${API_URL}/api/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, sender }),
  });
  if (!res.ok) throw new Error('Error al enviar mensaje');
  return res.json();
};

// Cerrar conversación
export const closeConversation = async (conversationId: number): Promise<Conversation> => {
  const res = await fetch(`${API_URL}/api/conversations/${conversationId}/close`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error('Error al cerrar conversación');
  return res.json();
};

// Asignar agente
export const assignConversation = async (conversationId: number, agentName: string): Promise<Conversation> => {
  const res = await fetch(`${API_URL}/api/conversations/${conversationId}/assign`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agentName }),
  });
  if (!res.ok) throw new Error('Error al asignar agente');
  return res.json();
};