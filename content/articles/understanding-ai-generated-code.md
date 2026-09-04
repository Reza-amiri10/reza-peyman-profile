---
title: "Why I Still Read Every Line an AI Writes for Me"
excerpt: "AI can write code faster than I ever could, but that doesn't mean I should stop understanding it. In an age where generating software is becoming easier, engineering judgment matters more than ever. Here's why I still read every line AI writes for me—and why I believe developers should never outsource their understanding."
date: "2026-04-14"
tags:
  [
    "AI",
    "Engineering Practices",
    "Opinion",
    "Software Development",
    "AI Coding Assistants",
    "Code Review",
  ]
---

AI has changed the way I write software.

Not gradually. Not slightly. It has changed the workflow itself.

A few years ago, building a feature meant spending time reading documentation, thinking through an implementation, writing the code, debugging it, and searching for answers when something went wrong. Today, I can describe what I want in a few sentences and have an AI coding assistant produce a surprisingly complete implementation in seconds.

It is incredibly useful.

But there is one habit I refuse to give up:

I still read every line an AI writes for me.

Not because I want to slow myself down. Quite the opposite. I use AI because I want to move faster. But moving fast is only useful if I still understand where I'm going.

## The Moment I Started Paying Attention

When I first began relying heavily on AI for programming, I noticed something interesting.

I could build things much faster.

A component that might have taken me an hour could appear in minutes. A repetitive API endpoint could be generated almost instantly. An unfamiliar library became easier to use because I could ask the AI to explain its API and provide an example.

But speed introduced a new problem.

Sometimes I found myself looking at code and thinking, "I know what this does, but I don't completely understand why it was written this way."

That distinction matters.

There is a huge difference between knowing that code works and understanding how and why it works.

And that is where I think developers need to be careful with AI.

## AI-Generated Code Is Not Automatically Good Code

AI can produce impressive code.

It can also produce unnecessary abstractions, inefficient queries, incorrect assumptions, outdated patterns, and subtle bugs—all while making the result look perfectly reasonable.

That is what makes AI-generated code different from an obvious mistake.

Bad code isn't always obviously bad.

A database query might return the correct data while performing terribly at scale. A React component might render correctly while creating unnecessary re-renders. An API endpoint might work perfectly while failing to validate an important input.

The code can pass a test and still be the wrong solution.

That's why I don't stop at asking, **"Does it work?"**

I also ask:

**Why does it work?**

What assumptions is this implementation making?

What happens when something goes wrong?

What happens with unexpected input?

Is this the simplest solution?

How will it behave when the application has ten thousand users instead of ten?

Could this introduce a security problem?

And perhaps most importantly:

**Would I be able to fix this code at 2 a.m. if it broke in production?**

If the answer is no, I haven't finished reviewing it.

## I Don't Want to Write Everything Manually

Reading every line doesn't mean I want to write every line myself.

That would completely miss the point of using AI.

There is plenty of work that I am happy to delegate.

Boilerplate code, repetitive functions, initial implementations, test cases, documentation, type definitions, and straightforward refactoring are excellent candidates for AI assistance.

If AI can save me thirty minutes of repetitive work, that's thirty minutes I can spend solving a more interesting problem.

The important distinction is this:

**I delegate typing. I don't delegate responsibility.**

When an AI generates code, I consider it a highly capable junior collaborator.

I might accept its suggestion immediately.

I might modify it.

I might reject it completely.

But I make that decision.

## The Developer's Job Is Changing

AI is changing what it means to be productive as a developer.

For a long time, productivity was closely associated with how quickly someone could write code.

Now, generating code is becoming incredibly cheap.

That changes the value of other skills.

Understanding architecture matters.

Knowing how systems behave matters.

Being able to identify security risks matters.

Debugging matters.

Reading unfamiliar code matters.

Knowing when an AI-generated solution is unnecessarily complicated matters.

In other words, **engineering judgment becomes more important when code becomes easier to produce.**

A developer who can generate 10,000 lines of code but cannot explain them isn't necessarily more productive than someone who generates 1,000 lines and understands every important decision.

More code is not the goal.

Better software is.

## AI Should Increase My Leverage, Not Reduce My Understanding

I don't think developers should be afraid of AI.

I also don't think developers should blindly trust it.

The most useful relationship with AI, at least for me, is somewhere in between.

I want AI to help me explore ideas faster, eliminate repetitive work, learn unfamiliar technologies, and turn concepts into working implementations.

But I still want to remain the person who understands the system.

Because when something breaks, the AI isn't sitting beside the customer.

When a security vulnerability appears, the AI isn't responsible for the consequences.

When a technical decision needs to be defended, someone has to understand why it was made.

That someone is the developer.

## The Rule I Want to Keep

My rule is simple:

**Never ship code I don't understand simply because an AI wrote it.**

That doesn't mean I need to understand every character of every dependency in my application. It means I should understand the code and decisions that I am responsible for.

AI has made programming faster.

I want to make sure it also makes me better.

So I'll keep using AI. I'll keep asking it questions. I'll let it write code. I'll let it challenge my ideas and help me solve problems.

But when it gives me an implementation, I'll still read it.

Every line that matters.

Because the goal isn't to become a developer who can generate code without thinking.

**The goal is to become a developer who can use AI to build better software—and still understand exactly what they built.**
