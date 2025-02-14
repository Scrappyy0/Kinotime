/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';
import useTVShowStore from '@/store/recentsStore';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { ArrowBigDownDashIcon, ChevronLeft, ChevronRight, ImageIcon, X } from 'lucide-react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '../ui/carousel';
import { CaretRightIcon } from '@radix-ui/react-icons';
import { AnimatePresence } from 'framer-motion';
import { Motiondiv } from './MotionDiv';
import { cn } from '@/lib/utils';
import { tmdbImage } from '@/lib/tmdb-image';
import { TextGlitch } from '../animated-common/TextFlip';
import { Badge } from '../ui/badge';
import { Episode } from '@/lib/types';

const RecentlyWatchedTV = () => {
	const { recentlyWatched, loadEpisodes, deleteRecentlyWatched } = useTVShowStore();

	useEffect(() => {
		loadEpisodes();
	}, []);

	function clearRecentlyWatched() {
		const store = useTVShowStore.getState();
		store.deleteRecentlyWatched();
	}
	return (
		recentlyWatched.length > 0 && (
			<Carousel opts={{ dragFree: true }} className="w-[99%]  mx-auto">
				<div className="flex font-bold justify-between  mx-auto text-xl md:text-3xl items-center my-1 py-1 flex-row">
					<div className="mx-1 flex gap-2 items-center">
						<h1 className="text-2xl flex  font-bold">Recently Watched</h1>
						<div>
							<CaretRightIcon className="h-full " />
						</div>
					</div>
					<div className="flex  gap-2">
						<CarouselPrevious variant={'secondary'} />
						<CarouselNext variant={'secondary'} />
					</div>
				</div>
				<AnimatePresence>
					<CarouselContent className="gap-2 ">
						{recentlyWatched.map((show: Episode, index: number) => (
							<CarouselItem
								className={cn(
									`group basis-7/12 w-full  md:basis-1/3 lg:basis-[15.75%]   `
								)}
								key={show.id}
							>
								<Link
									href={`/tv/${show.show_id}?season=${show.season_number}&episode=${show.episode_number}`}
								>
									<Motiondiv
										initial="hidden"
										animate="visible"
										transition={{
											delay: index * 0.1,
											ease: 'easeInOut',
											duration: 0.5,
										}}
										viewport={{ amount: 0 }}
										custom={index}
									>
										<div
											className="w-full h-full group group-hover:scale-95 duration-100 cursor-pointer space-y-2"
											data-testid="movie-card"
										>
											<div
												style={{ aspectRatio: 16 / 9 }}
												className="relative h-full  flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border bg-background/50 shadow"
											>
												{show.still_path ? (
													<div>
														<img
															className="object-cover  inset-0"
															src={tmdbImage(show.still_path, 'w500')}
															alt={show.name}
														/>
														
													</div>
												) : (
													<div className="flex items-center justify-center w-full h-full bg-background">
														<ImageIcon className="text-muted" />
													</div>
												)}
											</div>

											<div className="space-y-1.5">
												<div className="flex text-sm md:text-base items-start justify-between gap-1">
													<TextGlitch>{show.name}</TextGlitch>
												</div>
												<div
													className={`text-xs  flex gap-1 capitalize opacity-75 `}
												>
													Season {show.season_number}
													<p
														className={` capitalize
                          `}
													>
														• Episode {show.episode_number}
													</p>
												</div>
											</div>
										</div>
									</Motiondiv>
								</Link>
							</CarouselItem>
						))}
					</CarouselContent>
				</AnimatePresence>
			</Carousel>
		)
	);
};

export default RecentlyWatchedTV;
