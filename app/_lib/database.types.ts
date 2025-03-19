export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      bookings: {
        Row: {
          cabin_id: number;
          cabin_price: number;
          created_at: string;
          end_date: string;
          extras_price: number;
          guest_id: number;
          has_breakfast: boolean;
          id: number;
          is_paid: boolean;
          num_guests: number;
          num_nights: number;
          observations: string | null;
          start_date: string;
          status: string;
          total_price: number;
        };
        Insert: {
          cabin_id?: number;
          cabin_price?: number;
          created_at?: string;
          end_date?: string;
          extras_price?: number;
          guest_id?: number;
          has_breakfast?: boolean;
          id?: number;
          is_paid?: boolean;
          num_guests?: number;
          num_nights?: number;
          observations?: string | null;
          start_date?: string;
          status?: string;
          total_price?: number;
        };
        Update: {
          cabin_id?: number;
          cabin_price?: number;
          created_at?: string;
          end_date?: string;
          extras_price?: number;
          guest_id?: number;
          has_breakfast?: boolean;
          id?: number;
          is_paid?: boolean;
          num_guests?: number;
          num_nights?: number;
          observations?: string | null;
          start_date?: string;
          status?: string;
          total_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "bookings_cabin_id_fkey";
            columns: ["cabin_id"];
            isOneToOne: false;
            referencedRelation: "cabins";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_guest_id_fkey";
            columns: ["guest_id"];
            isOneToOne: false;
            referencedRelation: "guests";
            referencedColumns: ["id"];
          },
        ];
      };
      cabins: {
        Row: {
          created_at: string;
          description: string;
          discount: number;
          id: number;
          image: string;
          max_capacity: number;
          name: string;
          regular_price: number;
        };
        Insert: {
          created_at?: string;
          description?: string;
          discount?: number;
          id?: number;
          image?: string;
          max_capacity?: number;
          name?: string;
          regular_price?: number;
        };
        Update: {
          created_at?: string;
          description?: string;
          discount?: number;
          id?: number;
          image?: string;
          max_capacity?: number;
          name?: string;
          regular_price?: number;
        };
        Relationships: [];
      };
      guests: {
        Row: {
          country_flag: string | null;
          created_at: string;
          email: string;
          full_name: string;
          id: number;
          national_id: string | null;
          nationality: string | null;
        };
        Insert: {
          country_flag?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: number;
          national_id?: string | null;
          nationality?: string | null;
        };
        Update: {
          country_flag?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: number;
          national_id?: string | null;
          nationality?: string | null;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          breakfast_price: number;
          created_at: string;
          id: number;
          max_booking_length: number;
          max_guests_per_booking: number;
          min_booking_length: number;
        };
        Insert: {
          breakfast_price?: number;
          created_at?: string;
          id?: number;
          max_booking_length?: number;
          max_guests_per_booking?: number;
          min_booking_length?: number;
        };
        Update: {
          breakfast_price?: number;
          created_at?: string;
          id?: number;
          max_booking_length?: number;
          max_guests_per_booking?: number;
          min_booking_length?: number;
        };
        Relationships: [];
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
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
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
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
