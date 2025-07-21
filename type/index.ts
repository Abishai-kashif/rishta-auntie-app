export interface Match {
	name: string;
	age: number;
	location: string;
	interests: string[];
	imageUrl?: string;
}

export interface ChatMessage {
	id: string;
	role: "user" | "assistant" | "system";
	content: string;
	timestamp: Date;
}

export interface StreamedResponseEvent {
	type: "raw_response_event" | "tool_call_output_item" | "guardrail_triggered";
	message?: string;
	delta?: string;
	tool_result?: Match[];
}

export interface ChatModalProps {
	isOpen: boolean;
	onClose: () => void;
	onMatchesUpdate: (matches: Match[]) => void;
}

export interface MatchCardProps {
	match: Match;
}

export interface MatchRespones {
	users: Match[];
}