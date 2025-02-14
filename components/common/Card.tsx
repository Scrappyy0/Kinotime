/* eslint-disable @next/next/no-img-element */
import { Show } from "@/lib/types";
import Link from "next/link";
import React from "react";
import { Motiondiv } from "./MotionDiv";
import { TextGlitch } from "../animated-common/TextFlip";
import { Skeleton } from "../ui/skeleton";
import { tmdbImage } from "@/lib/tmdb-image";
import { ImageIcon, Play } from "lucide-react";
import { TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import BlurFade from "../ui/blur-fade";

export default function ShowCard(props: {
    index: number;
    variants?: any;
    show: Show;
    showRank?: Boolean;
    isVertical?: Boolean;
    type?: string;
    onClick?: any;
}) {
    const { index, show, showRank, isVertical, type } = props;

    const variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
        },
    };
    function calculateDelay(index: number) {
        const staggeredIndex = index % 20 !== 0 ? index % 20 : 0;
        return staggeredIndex;
    }
    return (
        <Link
        onClick={() => props.onClick && props.onClick(show)}
        href={`/${show.media_type || type}/${show.id}${(show.media_type || type) === "tv" ? "?season=1&episode=1" : ""}`}
    >
        <Motiondiv
            initial="hidden"
            animate="visible"
            transition={{
                delay: calculateDelay(index) * 0.1,
                ease: "easeInOut",
                duration: 0.5,
            }}
            viewport={{ amount: 0 }}
            custom={props.index}
            variants={variants}
            className="group group-hover:scale-95 duration-100"
        >
            {!isVertical ? (
                <Card movie={show} index={index} type={type} />
            ) : (
                <Card movie={show} index={index} type={type} />
            )}
        </Motiondiv>
    </Link>

    );
}
export const Card = ({ movie, language = "en-US", type, index }: any) => {
    const {
        title,
        backdrop_path: backdrop,
        poster_path: poster,
        overview,
        first_air_date,
        media_type,
        id,
        release_date,
        vote_average: voteAverage,
        vote_count: voteCount,
        name,
    } = movie;

    return (
    <div
        className="w-full h-full group hover:scale-95 duration-100 cursor-pointer space-y-2"
        data-testid="movie-card"
    >
        <div
        style={{aspectRatio:16/9}}
            className="relative w-full overflow-hidden rounded-md border bg-background/50 shadow"
        >
            {backdrop ? (
                <>
                    <BlurFade key={tmdbImage(backdrop, "w500")} delay={0.25 + index * 0.04} inView>
                        <img
                            className="w-full h-full object-cover"
                            src={tmdbImage(backdrop, "w500")}
                            alt={title}
                        />
                    </BlurFade>
                 
                </>
            ) : (
                <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-background">
                    <ImageIcon className="text-muted" />
                </div>
            )}
        </div>

            
        <div className="space-y-1.5">
            <div className="flex text-sm md:text-base items-start justify-between gap-1">
                <TextGlitch>{title || name}</TextGlitch>
                <Badge variant="secondary">
                    {voteAverage ? voteAverage.toFixed(1) : "?"}
                </Badge>
            </div>
            <div className="text-xs text-muted-foreground flex gap-1 capitalize">
                {(first_air_date || release_date)?.split("-")[0]}{" "}
                <p
                    className={`${(media_type || type)?.toLowerCase() === "tv"
                            ? "uppercase"
                            : "capitalize"
                        }`}
                >
                    • {type ? type : media_type}
                </p>
            </div>
        </div>
    </div>
);
};
