export interface Message {
	id: string;
	role: 'user' | 'assistant' | 'system';
	content: string;
	timestamp: number;
  }
  
  // Для отображения в компонентах
  export interface MessageDisplay {
	id: string;
	text: string;
	sender: 'user' | 'assistant';
	time: string;
  }
  
  export interface Chat {
	id: string;
	title: string;
	messages: Message[];
	createdAt: number;
	updatedAt: number;
  }
  
  export interface ChatState {
	chats: Chat[];
	activeChatId: string | null;
	isLoading: boolean;
	error: string | null;
  }
  
  export interface AppSettings {
	model: string;
	temperature: number;
	topP: number;
	maxTokens: number;
	systemPrompt: string;
	theme: 'light' | 'dark';
  }
  
  export interface AuthData {
	credentials: string;
	scope: 'GIGACHAT_API_PERS' | 'GIGACHAT_API_B2B' | 'GIGACHAT_API_CORP';
  }