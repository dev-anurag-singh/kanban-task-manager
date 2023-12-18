export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      boards: {
        Row: {
          created_at: string;
          id: string;
          title: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          title: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "boards_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      columns: {
        Row: {
          board_id: string;
          created_at: string;
          id: string;
          order: number;
          title: string;
          user_id: string;
        };
        Insert: {
          board_id: string;
          created_at?: string;
          id?: string;
          order: number;
          title: string;
          user_id?: string;
        };
        Update: {
          board_id?: string;
          created_at?: string;
          id?: string;
          order?: number;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "columns_board_id_fkey";
            columns: ["board_id"];
            isOneToOne: false;
            referencedRelation: "boards";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "columns_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      subtasks: {
        Row: {
          completed: boolean | null;
          created_at: string;
          id: string;
          task_id: string;
          title: string;
          user_id: string;
        };
        Insert: {
          completed?: boolean | null;
          created_at?: string;
          id?: string;
          task_id: string;
          title: string;
          user_id: string;
        };
        Update: {
          completed?: boolean | null;
          created_at?: string;
          id?: string;
          task_id?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subtasks_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subtasks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      tasks: {
        Row: {
          column_id: string;
          created_at: string;
          description: string | null;
          id: string;
          order: number;
          title: string;
          user_id: string;
        };
        Insert: {
          column_id: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          order: number;
          title: string;
          user_id?: string;
        };
        Update: {
          column_id?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          order?: number;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_column_id_fkey";
            columns: ["column_id"];
            isOneToOne: false;
            referencedRelation: "columns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
