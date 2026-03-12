export interface Message {
	id: number;
	text: string;
	sender: 'user' | 'assistant';
	time: string;
  }
  
  export interface Chat {
	id: number;
	title: string;
	lastMessage: string;
	date: string;
	isActive?: boolean;
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