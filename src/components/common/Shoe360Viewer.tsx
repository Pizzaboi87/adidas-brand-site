"use client";

import NextImage from "next/image";
import { useShoeImagesQuery } from "@/hooks/useShoeImagesQuery";
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

type Shoe360ViewerProps = {
    slug: string;
};

const Shoe360Viewer = ({ slug }: Shoe360ViewerProps) => {
    const { data: allFrames = [], isLoading, error } = useShoeImagesQuery(slug);
    const frames = allFrames.slice(1);
    const frameCount = frames.length;

    const [currentFrame, setCurrentFrame] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [imgSrc, setImgSrc] = useState<string>("/other/logo-transparent.png");
    const startXRef = useRef(0);
    const frameRef = useRef(0);
    const idleAnimationRef = useRef<NodeJS.Timeout | null>(null);

    // Preload frames
    useEffect(() => {
        if (frameCount > 0) {
            frames.forEach((src) => {
                const img = new Image();
                img.src = src;
            });
            setImgSrc(frames[0]);
        }
    }, [frames, frameCount]);

    // Start rotating shoe automatically when idle
    useEffect(() => {
        if (frameCount === 0 || isDragging) return;

        const direction = 1;
        const delay = 360;

        idleAnimationRef.current = setInterval(() => {
            frameRef.current = (frameRef.current + direction + frameCount) % frameCount;
            setCurrentFrame(frameRef.current);
        }, delay);

        return () => {
            if (idleAnimationRef.current) clearInterval(idleAnimationRef.current);
        };
    }, [frameCount, isDragging]);

    const stopIdleAnimation = () => {
        if (idleAnimationRef.current) {
            clearInterval(idleAnimationRef.current);
            idleAnimationRef.current = null;
        }
    };

    // Drag & touch handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        stopIdleAnimation();
        setIsDragging(true);
        startXRef.current = e.clientX;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || frameCount === 0) return;
        const deltaX = e.clientX - startXRef.current;
        if (Math.abs(deltaX) > 5) {
            const direction = deltaX > 0 ? 1 : -1;
            frameRef.current = (frameRef.current - direction + frameCount) % frameCount;
            setCurrentFrame(frameRef.current);
            startXRef.current = e.clientX;
        }
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    const handleTouchStart = (e: React.TouchEvent) => {
        stopIdleAnimation();
        setIsDragging(true);
        startXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || frameCount === 0) return;
        const deltaX = e.touches[0].clientX - startXRef.current;
        if (Math.abs(deltaX) > 5) {
            const direction = deltaX > 0 ? 1 : -1;
            frameRef.current = (frameRef.current - direction + frameCount) % frameCount;
            setCurrentFrame(frameRef.current);
            startXRef.current = e.touches[0].clientX;
        }
    };

    const handleTouchEnd = () => setIsDragging(false);

    // Error & fallback handler (from ShoeCard)
    const handleImgError = () => setImgSrc("/other/no-image.webp");

    // Statuses
    if (isLoading) {
        return (
            <div className="w-full h-96 bg-gray-100 animate-pulse rounded-md flex items-center justify-center">
                <NextImage
                    src="/other/logo-transparent.png"
                    alt="Loading logo"
                    width={120}
                    height={120}
                    className="opacity-70"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-96 bg-gray-50 flex items-center justify-center">
                <NextImage
                    src="/other/no-image.webp"
                    alt="Failed to load"
                    width={200}
                    height={200}
                    className="object-contain"
                />
            </div>
        );
    }

    if (frames.length === 0) {
        return (
            <div className="w-full h-96 bg-gray-50 text-center pt-24 text-gray-400">
                No 360° images
            </div>
        );
    }

    return (
        <div
            className="select-none mt-10 shadow-md flex flex-center flex-col p-5 lg:p-10 relative cursor-grab w-full sm:w-3/4 2xl:w-[75%] active:cursor-grabbing photobg"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="border border-gray-300 relative">
                <NextImage
                    src="/other/tape.webp"
                    alt="tape"
                    width={100}
                    height={50}
                    className="absolute -top-10 md:-top-16  -left-15 md:-left-30 lg:-left-20 -rotate-10 w-1/2 h-1/4"
                />

                {/* main image with fallback - next.js image has issues with cache */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={frames[currentFrame] || imgSrc}
                    alt={`${slug} 360° view`}
                    width={400}
                    height={300}
                    className="w-full h-auto block object-contain transition-transform duration-100"
                    draggable={false}
                    onError={handleImgError}
                />

                <NextImage
                    src="/other/tape.webp"
                    alt="tape"
                    width={100}
                    height={50}
                    className="absolute -bottom-30 lg:-bottom-35 -right-18 lg:-right-25 -rotate-10 w-2/3 h-1/4"
                />
            </div>

            <div className="mx-auto pt-5 font-adineu text-gray-600 inline-flex flex-col items-center">
                <p>View 360°</p>
                <Icon icon="material-symbols:360" width="32" height="32" />
            </div>
        </div>
    );
};

export default Shoe360Viewer;
