# PRD: PreviewFlow (Multi-Platform Social

# Previewer)

## 1. Executive Summary

**PreviewFlow** is a web-based tool designed for social media managers and designers to
visualize how their content (images and copy) will appear across different social media
environments before going live. It eliminates the "post-and-delete" anxiety caused by awkward
cropping or truncated text.

## 2. Target Audience

```
● Social Media Managers: To validate copy length and visual impact.
● Graphic Designers: To check if safe zones and compositions work across different
aspect ratios.
● Agency Account Managers: To showcase "mockups" to clients for quick approval.
```
## 3. User Stories

1. **As a user** , I want to upload an image so I can see it inside a social media frame.
2. **As a user** , I want to type my caption and see where the "See More" break happens.
3. **As a user** , I want to toggle between Instagram, LinkedIn, and X (Twitter) views instantly.
4. **As a user** , I want to save my previews into "Projects" so I can come back to them later.

## 4. Functional Requirements (MVP)

### 4.1 Content Input

```
● Image Upload: Support for JPG/PNG (Max 5MB).
● Text Editor: A simple textarea for the post caption.
● Platform Selector: Tabs or a Sidebar to switch between:
○ Instagram (Feed - Square/Portrait).
○ LinkedIn (Desktop Feed).
○ X / Twitter (Mobile Feed).
```
### 4.2 The "Mockup" Engine

```
● Dynamic Preview: A central container that renders the uploaded image and text inside a
CSS-simulated UI of the chosen platform.
● Visual Fidelity: Must include "fake" UI elements (Like, Comment, Share icons, Profile
Picture placeholder) to provide context.
```

### 4.3 Persistence (Supabase Integration)

```
● Authentication: Basic Email/Password signup via Supabase Auth.
● Storage: Images stored in Supabase Storage buckets.
● Database: Save post metadata (caption, image URL, selected platform) in a posts table.
```
## 5. Technical Stack

```
● Frontend: ReactJS (Vite for fast setup).
● Styling: Tailwind CSS (Essential for rapid UI mocking and responsiveness).
● Backend/Database: Supabase (Auth, PostgreSQL, and Storage).
● State Management: React Context API or simple useState (Redux is overkill for this
scope).
```
## 6. Data Schema (Supabase)

### Table: profiles

```
Column Type Notes
id uuid Primary Key (references
auth.users)
username text User display name
```
### Table: previews

```
Column Type Notes
id uuid Primary Key
user_id uuid Foreign Key to profiles
image_url text Link to Supabase Storage
caption text The post copy
created_at timestamp
```
## 7. Simple UI Flow

1. **Landing/Login:** Simple "Get Started" button.
2. **Dashboard:** A list of "Recent Previews" and a "Create New" button.
3. **The Editor (Main Screen):**
    ○ **Left Panel:** Input fields (Upload + Textarea).
    ○ **Center/Right Panel:** The Preview Canvas.


```
○ Top Bar: Platform Toggle (IG | LI | X).
○ Action: "Save Project" button.
```
## 8. Out of Scope (For Future Iterations)

```
● Video preview support.
● Multi-image (Carousel) previews.
● Direct publishing to Social APIs.
● AI Caption suggestions.
```
## 9. Success Metrics for the Interview

```
● Performance: The preview updates instantly as the user types (no lag).
● Visual Accuracy: The CSS mockups look "real enough" to be convincing.
● Code Quality: Clean component separation (e.g., a <MockupContainer /> that accepts
platform as a prop).
```

