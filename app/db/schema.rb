# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140711083442) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ar_internal_metadata", primary_key: "key", force: :cascade do |t|
    t.string   "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "delayed_jobs", ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree

  create_table "playlists", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "track_ids",   default: [], array: true
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "top_genres",  default: [], array: true
  end

  create_table "tracks", force: :cascade do |t|
    t.string   "artist"
    t.string   "title"
    t.string   "profile_url"
    t.string   "page_url"
    t.decimal  "duration"
    t.decimal  "timestamp"
    t.string   "timeformat"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "comment"
    t.string   "track_id"
    t.boolean  "shareable"
    t.string   "service"
    t.string   "artwork_url"
    t.integer  "user_id"
    t.string   "genres",      default: [],    array: true
    t.integer  "plays",       default: 0
    t.integer  "submit_id"
    t.boolean  "spam",        default: true
    t.integer  "spamscore",   default: 0
    t.boolean  "copy",        default: false
  end

  add_index "tracks", ["genres"], name: "index_tracks_on_genres", using: :gin

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "reported_list",          default: [], null: false, array: true
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
