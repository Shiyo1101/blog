"use client";

import { SearchIcon, TagIcon } from "lucide-react";
import { useState } from "react";

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
    <div className="border-2 border-card-foreground bg-card">
      <div className="bg-primary border-b-2 border-card-foreground px-3 py-1.5 flex items-center gap-2">
        <TagIcon size={12} className="text-primary-foreground" />
        <span className="text-primary-foreground text-xs font-bold tracking-widest font-ichigojam">
          SEARCH BY TAG
        </span>
      </div>
      <div className="p-3 space-y-3">
        <div className="flex items-center gap-2 border-2 border-card-foreground bg-background px-2 py-1.5">
          <SearchIcon size={12} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="タグを絞り込む..."
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
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
    </div>
  );
};

export default TagSearchBar;
