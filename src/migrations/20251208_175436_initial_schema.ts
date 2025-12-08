import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`guests\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`code\` text NOT NULL,
  	\`is_general_invite\` integer DEFAULT false,
  	\`status\` text DEFAULT 'pending',
  	\`wishes\` text,
  	\`number_of_guests\` numeric DEFAULT 1,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`guests_code_idx\` ON \`guests\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`guests_updated_at_idx\` ON \`guests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`guests_created_at_idx\` ON \`guests\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`bride_guests\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`code\` text NOT NULL,
  	\`is_general_invite\` integer DEFAULT false,
  	\`status\` text DEFAULT 'pending',
  	\`wishes\` text,
  	\`number_of_guests\` numeric DEFAULT 1,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bride_guests_code_idx\` ON \`bride_guests\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`bride_guests_updated_at_idx\` ON \`bride_guests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bride_guests_created_at_idx\` ON \`bride_guests\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`groom_guests\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`code\` text NOT NULL,
  	\`is_general_invite\` integer DEFAULT false,
  	\`status\` text DEFAULT 'pending',
  	\`wishes\` text,
  	\`number_of_guests\` numeric DEFAULT 1,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`groom_guests_code_idx\` ON \`groom_guests\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`groom_guests_updated_at_idx\` ON \`groom_guests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`groom_guests_created_at_idx\` ON \`groom_guests\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`guests_id\` integer,
  	\`bride_guests_id\` integer,
  	\`groom_guests_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`guests_id\`) REFERENCES \`guests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bride_guests_id\`) REFERENCES \`bride_guests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`groom_guests_id\`) REFERENCES \`groom_guests\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_guests_id_idx\` ON \`payload_locked_documents_rels\` (\`guests_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_bride_guests_id_idx\` ON \`payload_locked_documents_rels\` (\`bride_guests_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_groom_guests_id_idx\` ON \`payload_locked_documents_rels\` (\`groom_guests_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`wedding_details_timeline\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`time\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`location\` text,
  	\`map_url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`wedding_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`wedding_details_timeline_order_idx\` ON \`wedding_details_timeline\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`wedding_details_timeline_parent_id_idx\` ON \`wedding_details_timeline\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`wedding_details_custom_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`title\` text,
  	\`content\` text,
  	\`background_image_id\` integer,
  	\`parallax_speed\` numeric DEFAULT 0.5,
  	\`min_height\` text DEFAULT '70vh',
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`wedding_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`wedding_details_custom_sections_order_idx\` ON \`wedding_details_custom_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`wedding_details_custom_sections_parent_id_idx\` ON \`wedding_details_custom_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`wedding_details_custom_sections_background_image_idx\` ON \`wedding_details_custom_sections\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`wedding_details\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`bride_name\` text NOT NULL,
  	\`bride_bio\` text,
  	\`bride_photo_id\` integer,
  	\`groom_name\` text NOT NULL,
  	\`groom_bio\` text,
  	\`groom_photo_id\` integer,
  	\`quote\` text,
  	\`quote_author\` text,
  	\`quote_background_image_id\` integer,
  	\`couple_background_image_id\` integer,
  	\`ceremony_time\` text NOT NULL,
  	\`ceremony_date\` text NOT NULL,
  	\`ceremony_day_of_week\` text,
  	\`ceremony_lunar_date\` text,
  	\`ceremony_venue_name\` text NOT NULL,
  	\`ceremony_venue_address\` text NOT NULL,
  	\`ceremony_map_url\` text,
  	\`gift_config_bride_q_r_code_id\` integer,
  	\`gift_config_groom_q_r_code_id\` integer,
  	\`venue_name\` text NOT NULL,
  	\`venue_address\` text NOT NULL,
  	\`venue_map_url\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`bride_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`groom_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`quote_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`couple_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gift_config_bride_q_r_code_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gift_config_groom_q_r_code_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`wedding_details_bride_bride_photo_idx\` ON \`wedding_details\` (\`bride_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`wedding_details_groom_groom_photo_idx\` ON \`wedding_details\` (\`groom_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`wedding_details_quote_background_image_idx\` ON \`wedding_details\` (\`quote_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`wedding_details_couple_background_image_idx\` ON \`wedding_details\` (\`couple_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`wedding_details_gift_config_gift_config_bride_q_r_code_idx\` ON \`wedding_details\` (\`gift_config_bride_q_r_code_id\`);`)
  await db.run(sql`CREATE INDEX \`wedding_details_gift_config_gift_config_groom_q_r_code_idx\` ON \`wedding_details\` (\`gift_config_groom_q_r_code_id\`);`)
  await db.run(sql`CREATE TABLE \`wedding_details_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`wedding_details\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`wedding_details_rels_order_idx\` ON \`wedding_details_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`wedding_details_rels_parent_idx\` ON \`wedding_details_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`wedding_details_rels_path_idx\` ON \`wedding_details_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`wedding_details_rels_media_id_idx\` ON \`wedding_details_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`bride_wedding_details_timeline\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`time\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`location\` text,
  	\`map_url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bride_wedding_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_timeline_order_idx\` ON \`bride_wedding_details_timeline\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_timeline_parent_id_idx\` ON \`bride_wedding_details_timeline\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bride_wedding_details_custom_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`title\` text,
  	\`content\` text,
  	\`background_image_id\` integer,
  	\`parallax_speed\` numeric DEFAULT 0.5,
  	\`min_height\` text DEFAULT '70vh',
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bride_wedding_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_custom_sections_order_idx\` ON \`bride_wedding_details_custom_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_custom_sections_parent_id_idx\` ON \`bride_wedding_details_custom_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_custom_sections_background_image_idx\` ON \`bride_wedding_details_custom_sections\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`bride_wedding_details\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`bride_name\` text NOT NULL,
  	\`bride_bio\` text,
  	\`bride_photo_id\` integer,
  	\`groom_name\` text NOT NULL,
  	\`groom_bio\` text,
  	\`groom_photo_id\` integer,
  	\`quote\` text,
  	\`quote_author\` text,
  	\`quote_background_image_id\` integer,
  	\`couple_background_image_id\` integer,
  	\`ceremony_time\` text NOT NULL,
  	\`ceremony_date\` text NOT NULL,
  	\`ceremony_day_of_week\` text,
  	\`ceremony_lunar_date\` text,
  	\`ceremony_venue_name\` text NOT NULL,
  	\`ceremony_venue_address\` text NOT NULL,
  	\`ceremony_map_url\` text,
  	\`gift_config_bride_q_r_code_id\` integer,
  	\`gift_config_groom_q_r_code_id\` integer,
  	\`venue_name\` text NOT NULL,
  	\`venue_address\` text NOT NULL,
  	\`venue_map_url\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`bride_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`groom_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`quote_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`couple_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gift_config_bride_q_r_code_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gift_config_groom_q_r_code_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_bride_bride_photo_idx\` ON \`bride_wedding_details\` (\`bride_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_groom_groom_photo_idx\` ON \`bride_wedding_details\` (\`groom_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_quote_background_image_idx\` ON \`bride_wedding_details\` (\`quote_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_couple_background_image_idx\` ON \`bride_wedding_details\` (\`couple_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_gift_config_gift_config_bride_q_r__idx\` ON \`bride_wedding_details\` (\`gift_config_bride_q_r_code_id\`);`)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_gift_config_gift_config_groom_q_r__idx\` ON \`bride_wedding_details\` (\`gift_config_groom_q_r_code_id\`);`)
  await db.run(sql`CREATE TABLE \`bride_wedding_details_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`bride_wedding_details\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_rels_order_idx\` ON \`bride_wedding_details_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_rels_parent_idx\` ON \`bride_wedding_details_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_rels_path_idx\` ON \`bride_wedding_details_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`bride_wedding_details_rels_media_id_idx\` ON \`bride_wedding_details_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`groom_wedding_details_timeline\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`time\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`location\` text,
  	\`map_url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`groom_wedding_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_timeline_order_idx\` ON \`groom_wedding_details_timeline\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_timeline_parent_id_idx\` ON \`groom_wedding_details_timeline\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`groom_wedding_details_custom_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`title\` text,
  	\`content\` text,
  	\`background_image_id\` integer,
  	\`parallax_speed\` numeric DEFAULT 0.5,
  	\`min_height\` text DEFAULT '70vh',
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`groom_wedding_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_custom_sections_order_idx\` ON \`groom_wedding_details_custom_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_custom_sections_parent_id_idx\` ON \`groom_wedding_details_custom_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_custom_sections_background_image_idx\` ON \`groom_wedding_details_custom_sections\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`groom_wedding_details\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`bride_name\` text NOT NULL,
  	\`bride_bio\` text,
  	\`bride_photo_id\` integer,
  	\`groom_name\` text NOT NULL,
  	\`groom_bio\` text,
  	\`groom_photo_id\` integer,
  	\`quote\` text,
  	\`quote_author\` text,
  	\`quote_background_image_id\` integer,
  	\`couple_background_image_id\` integer,
  	\`ceremony_time\` text NOT NULL,
  	\`ceremony_date\` text NOT NULL,
  	\`ceremony_day_of_week\` text,
  	\`ceremony_lunar_date\` text,
  	\`ceremony_venue_name\` text NOT NULL,
  	\`ceremony_venue_address\` text NOT NULL,
  	\`ceremony_map_url\` text,
  	\`gift_config_bride_q_r_code_id\` integer,
  	\`gift_config_groom_q_r_code_id\` integer,
  	\`venue_name\` text NOT NULL,
  	\`venue_address\` text NOT NULL,
  	\`venue_map_url\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`bride_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`groom_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`quote_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`couple_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gift_config_bride_q_r_code_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gift_config_groom_q_r_code_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_bride_bride_photo_idx\` ON \`groom_wedding_details\` (\`bride_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_groom_groom_photo_idx\` ON \`groom_wedding_details\` (\`groom_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_quote_background_image_idx\` ON \`groom_wedding_details\` (\`quote_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_couple_background_image_idx\` ON \`groom_wedding_details\` (\`couple_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_gift_config_gift_config_bride_q_r__idx\` ON \`groom_wedding_details\` (\`gift_config_bride_q_r_code_id\`);`)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_gift_config_gift_config_groom_q_r__idx\` ON \`groom_wedding_details\` (\`gift_config_groom_q_r_code_id\`);`)
  await db.run(sql`CREATE TABLE \`groom_wedding_details_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`groom_wedding_details\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_rels_order_idx\` ON \`groom_wedding_details_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_rels_parent_idx\` ON \`groom_wedding_details_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_rels_path_idx\` ON \`groom_wedding_details_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`groom_wedding_details_rels_media_id_idx\` ON \`groom_wedding_details_rels\` (\`media_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`guests\`;`)
  await db.run(sql`DROP TABLE \`bride_guests\`;`)
  await db.run(sql`DROP TABLE \`groom_guests\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`wedding_details_timeline\`;`)
  await db.run(sql`DROP TABLE \`wedding_details_custom_sections\`;`)
  await db.run(sql`DROP TABLE \`wedding_details\`;`)
  await db.run(sql`DROP TABLE \`wedding_details_rels\`;`)
  await db.run(sql`DROP TABLE \`bride_wedding_details_timeline\`;`)
  await db.run(sql`DROP TABLE \`bride_wedding_details_custom_sections\`;`)
  await db.run(sql`DROP TABLE \`bride_wedding_details\`;`)
  await db.run(sql`DROP TABLE \`bride_wedding_details_rels\`;`)
  await db.run(sql`DROP TABLE \`groom_wedding_details_timeline\`;`)
  await db.run(sql`DROP TABLE \`groom_wedding_details_custom_sections\`;`)
  await db.run(sql`DROP TABLE \`groom_wedding_details\`;`)
  await db.run(sql`DROP TABLE \`groom_wedding_details_rels\`;`)
}
