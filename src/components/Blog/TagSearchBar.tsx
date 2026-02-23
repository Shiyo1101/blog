"use client";

import { SearchIcon, TagIcon, XIcon } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type TagSearchBarProps = {
  tags: string[];
  currentTag?: string;
};

const TagSearchBar = ({ tags, currentTag }: TagSearchBarProps) => {
  const [query, setQuery] = useState("");

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Dialog onOpenChange={(open) => !open && setQuery("")}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 w-full border-2 border-card-foreground bg-card px-3 py-2 text-xs font-bold tracking-wide transition-colors hover:bg-accent hover:text-accent-foreground hover:cursor-pointer"
        >
          <TagIcon size={12} />
          <span className="font-ichigojam">SEARCH BY TAG</span>
          <span className="ml-auto text-muted-foreground font-normal">
            {tags.length}件
          </span>
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="max-md:max-w-4/5 rounded-none border-4 border-card-foreground bg-card shadow-[4px_4px_0_0] p-0 gap-0 max-w-md"
      >
        {/* ヘッダー */}
        <DialogHeader className="bg-primary border-b-2 border-card-foreground px-4 py-2 gap-0">
          <DialogTitle className="flex items-center gap-2 text-primary-foreground text-sm font-bold tracking-widest font-ichigojam">
            <TagIcon size={13} />
            SEARCH BY TAG
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          {/* 検索入力 */}
          <div className="flex items-center gap-2 border-2 border-card-foreground bg-background px-3 py-2">
            <SearchIcon size={13} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="タグを絞り込む..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="クリア"
              >
                <XIcon
                  size={13}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                />
              </button>
            )}
          </div>

          {/* タグ一覧 */}
          <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog/${tag}`}
                  className={`inline-block px-2 py-0.5 text-xs border transition-colors duration-150 ${
                    currentTag === tag
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-primary/20 text-primary border-primary hover:bg-primary/40"
                  }`}
                >
                  #{tag}
                </a>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">
                タグが見つかりません
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TagSearchBar;
