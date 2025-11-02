# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A tarot-based tool for tabletop roleplaying games (TTRPGs). The project is in early development stages.

## Resources

- **Tarot Card Images**: Located in `docs/images/` - contains tarot card imagery
- **Reference Material**: `docs/pg43548-images.html` - HTML reference document from Project Gutenberg
- **SvelteKit Documentation References**: See Svelte section below

### Svelte Documentation for LLMs

> Svelte is a UI framework that uses a compiler to let you write breathtakingly concise components that do minimal work in the browser, using languages you already know — HTML, CSS and JavaScript.

#### Documentation Sets

- [Abridged documentation](https://svelte.dev/llms-medium.txt): A shorter version of the Svelte and SvelteKit documentation, with examples and non-essential content removed
- [Compressed documentation](https://svelte.dev/llms-small.txt): A minimal version of the Svelte and SvelteKit documentation, with many examples and non-essential content removed
- [Complete documentation](https://svelte.dev/llms-full.txt): The complete Svelte and SvelteKit documentation including all examples and additional content

#### Individual Package Documentation

- [Svelte documentation](https://svelte.dev/docs/svelte/llms.txt): This is the developer documentation for Svelte.
- [SvelteKit documentation](https://svelte.dev/docs/kit/llms.txt): This is the developer documentation for SvelteKit.
- [Svelte CLI documentation](https://svelte.dev/docs/cli/llms.txt): This is the developer documentation for Svelte CLI.
- [Svelte MCP documentation](https://svelte.dev/docs/mcp/llms.txt): This is the developer documentation for Svelte MCP.

#### Notes

- The abridged and compressed documentation excludes legacy compatibility notes, detailed examples, and supplementary information
- The complete documentation includes all content from the official documentation
- Package-specific documentation files contain only the content relevant to that package
- The content is automatically generated from the same source as the official documentation

## Project Status

This repository is currently in the initial setup phase with documentation and image assets but no application code yet.

The idea is to build a static SvelteKit 5 SPA, in a graphical style which fits the old Tarot illustrations.

## Plans

I want to be able to use inspiration from tarot when my players encounter people/creatures/whatever.

1. A single player character (PC) or team of PCs, should get a card which represents them, which is used in one or more encunters.
2. On an encounter, three cards are drawn from the deck, straight or reversed.
3. The interpretation of each drawn card is presented to inspire the encounter.

### Card representing the PC(s)

To determine the card to use for players, we start by asking how many players there are.
If there is more than one player, we'll use a card from the minor arcana matching the size of the group from 2-10 (using 10 if more).
To determine the suite, we assume that the suites match elements, swords=air, cups=water, pentacles=earth and wands=fire.
We start by determing if the team is more emotional or rational driven: If more emotional, they get wands if the emotions are more hot, and cups if the emotions are more cool.
If they are more rational than emotional, they get pentacles if they are more pragmatic, and swords if they more lofty, visionary.
E.g, four cool Traveller adventurers who try to gain wealth by trading with a starship would get four of pentacles.
Three HarnMaster Peoni clerics trying to help people in need would get three of cups.

If it's a single person, we should have various archetypes matching the 22 major arcana cards,
and if they don't fit, we select a suite as above, and then ace or a dressed card which fits best.

### Encounters

For each encounter, three cards are drawn. We assume that the card representing the PCs are at the left, i.e. in column 1, so we'll populate columns 2, 3, 4 now.

First a card representing the encountered NPC is drawn and placed in column 3.

Secondly, a card representing the context or background for the NPC is drawn and placed in column 4.

Finally, a card representing how the NPC reacts to the PCs is drawn and placed in column 2.

Interpretations of drawn cards are presented as the cards appear.

## Way of working

We should use modern, Svelte 5 syntax.
Code should be structured for maintainability, with a clear separation of UX and domain logic/knowledge.
Domain logic/knowledge should go in a separate js or ts module, separated from .svelte files.
The visual layout should match the style of the tarot cards.
Use Test Driven Develoment consistently.
Use tools like eslint and sveltes builtin quality tools.
