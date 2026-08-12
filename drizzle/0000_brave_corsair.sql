CREATE TABLE "charts" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"token" varchar(32) NOT NULL,
	"config" jsonb NOT NULL,
	"people" jsonb NOT NULL,
	"email" varchar(320),
	"parent_chart_id" varchar(32),
	"source" varchar(32) DEFAULT 'manual' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_viewed_at" timestamp with time zone,
	"view_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "discount_codes" (
	"code" varchar(40) PRIMARY KEY NOT NULL,
	"percent_off" integer NOT NULL,
	"max_redemptions" integer,
	"redemptions" integer DEFAULT 0 NOT NULL,
	"expires_at" timestamp with time zone,
	"active" boolean DEFAULT true NOT NULL,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "email_log" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"template" varchar(40) NOT NULL,
	"dedupe_key" varchar(200) NOT NULL,
	"provider_id" varchar(128),
	"error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"visitor_id" varchar(32) NOT NULL,
	"session_id" varchar(32),
	"chart_id" varchar(32),
	"order_id" varchar(32),
	"path" text,
	"referrer" text,
	"utm_source" varchar(80),
	"utm_medium" varchar(80),
	"utm_campaign" varchar(120),
	"value" integer,
	"props" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"reference" varchar(16) NOT NULL,
	"chart_id" varchar(32) NOT NULL,
	"email" varchar(320) NOT NULL,
	"customer_name" varchar(200),
	"status" varchar(24) DEFAULT 'pending' NOT NULL,
	"fulfillment_status" varchar(24) DEFAULT 'unfulfilled' NOT NULL,
	"items" jsonb NOT NULL,
	"chart_snapshot" jsonb,
	"subtotal" integer NOT NULL,
	"discount" integer DEFAULT 0 NOT NULL,
	"shipping" integer DEFAULT 0 NOT NULL,
	"tax" integer DEFAULT 0 NOT NULL,
	"total" integer NOT NULL,
	"assumed_cogs" integer DEFAULT 0 NOT NULL,
	"discount_code" varchar(40),
	"stripe_session_id" varchar(255),
	"stripe_payment_intent_id" varchar(255),
	"shipping_address" jsonb,
	"fulfillment_id" varchar(128),
	"tracking_url" text,
	"artwork_url" text,
	"utm_source" varchar(80),
	"utm_medium" varchar(80),
	"utm_campaign" varchar(120),
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"paid_at" timestamp with time zone,
	"fulfilled_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "processed_webhooks" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"type" varchar(80) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscribers" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"source" varchar(40) DEFAULT 'unknown' NOT NULL,
	"chart_id" varchar(32),
	"unsubscribed_at" timestamp with time zone,
	"unsub_token" varchar(32) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "charts_token_idx" ON "charts" USING btree ("token");--> statement-breakpoint
CREATE INDEX "charts_email_idx" ON "charts" USING btree ("email");--> statement-breakpoint
CREATE INDEX "charts_created_idx" ON "charts" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "charts_parent_idx" ON "charts" USING btree ("parent_chart_id");--> statement-breakpoint
CREATE UNIQUE INDEX "email_log_dedupe_idx" ON "email_log" USING btree ("dedupe_key");--> statement-breakpoint
CREATE INDEX "events_name_created_idx" ON "events" USING btree ("name","created_at");--> statement-breakpoint
CREATE INDEX "events_visitor_idx" ON "events" USING btree ("visitor_id");--> statement-breakpoint
CREATE INDEX "events_created_idx" ON "events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "events_chart_idx" ON "events" USING btree ("chart_id");--> statement-breakpoint
CREATE UNIQUE INDEX "orders_reference_idx" ON "orders" USING btree ("reference");--> statement-breakpoint
CREATE UNIQUE INDEX "orders_session_idx" ON "orders" USING btree ("stripe_session_id");--> statement-breakpoint
CREATE INDEX "orders_email_idx" ON "orders" USING btree ("email");--> statement-breakpoint
CREATE INDEX "orders_status_idx" ON "orders" USING btree ("status");--> statement-breakpoint
CREATE INDEX "orders_created_idx" ON "orders" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "orders_chart_idx" ON "orders" USING btree ("chart_id");--> statement-breakpoint
CREATE UNIQUE INDEX "subscribers_email_idx" ON "subscribers" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "subscribers_unsub_idx" ON "subscribers" USING btree ("unsub_token");