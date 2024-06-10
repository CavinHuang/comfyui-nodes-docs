---
tags:
- AnimationScheduling
- VisualEffects
---

# CrossFadeImages
## Documentation
- Class name: `CrossFadeImages`
- Category: `KJNodes/image`
- Output node: `False`

The CrossFadeImages node is designed to blend two sequences of images together over a specified number of frames, using a variety of easing functions to control the transition dynamics. This node allows for the creation of smooth transitions between images, enhancing visual storytelling or creating dynamic visual effects.
## Input types
### Required
- **`images_i`**
    - unknown
    - Comfy dtype: `IMAGE`
    - Python dtype: `unknown`
- **`interpolation`**
    - Specifies the easing function to be used for the transition, affecting how the crossfade between images progresses over time.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`transition_start_index`**
    - The index in the image sequences where the transition begins, allowing for precise control over the timing of the crossfade.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`transitioning_frames`**
    - The number of frames over which the transition occurs, defining the length of the crossfade effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_level`**
    - The initial alpha value for the crossfade, determining the starting blend ratio between the two image sequences.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_level`**
    - The final alpha value for the crossfade, determining the ending blend ratio between the two image sequences.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting sequence of images after applying the crossfade transition between the two input sequences.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CrossFadeImages:
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "crossfadeimages"
    CATEGORY = "KJNodes/image"

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "images_1": ("IMAGE",),
                 "images_2": ("IMAGE",),
                 "interpolation": (["linear", "ease_in", "ease_out", "ease_in_out", "bounce", "elastic", "glitchy", "exponential_ease_out"],),
                 "transition_start_index": ("INT", {"default": 1,"min": 0, "max": 4096, "step": 1}),
                 "transitioning_frames": ("INT", {"default": 1,"min": 0, "max": 4096, "step": 1}),
                 "start_level": ("FLOAT", {"default": 0.0,"min": 0.0, "max": 1.0, "step": 0.01}),
                 "end_level": ("FLOAT", {"default": 1.0,"min": 0.0, "max": 1.0, "step": 0.01}),
        },
    } 
    
    def crossfadeimages(self, images_1, images_2, transition_start_index, transitioning_frames, interpolation, start_level, end_level):

        def crossfade(images_1, images_2, alpha):
            crossfade = (1 - alpha) * images_1 + alpha * images_2
            return crossfade
        def ease_in(t):
            return t * t
        def ease_out(t):
            return 1 - (1 - t) * (1 - t)
        def ease_in_out(t):
            return 3 * t * t - 2 * t * t * t
        def bounce(t):
            if t < 0.5:
                return self.ease_out(t * 2) * 0.5
            else:
                return self.ease_in((t - 0.5) * 2) * 0.5 + 0.5
        def elastic(t):
            return math.sin(13 * math.pi / 2 * t) * math.pow(2, 10 * (t - 1))
        def glitchy(t):
            return t + 0.1 * math.sin(40 * t)
        def exponential_ease_out(t):
            return 1 - (1 - t) ** 4

        easing_functions = {
            "linear": lambda t: t,
            "ease_in": ease_in,
            "ease_out": ease_out,
            "ease_in_out": ease_in_out,
            "bounce": bounce,
            "elastic": elastic,
            "glitchy": glitchy,
            "exponential_ease_out": exponential_ease_out,
        }

        crossfade_images = []

        alphas = torch.linspace(start_level, end_level, transitioning_frames)
        for i in range(transitioning_frames):
            alpha = alphas[i]
            image1 = images_1[i + transition_start_index]
            image2 = images_2[i + transition_start_index]
            easing_function = easing_functions.get(interpolation)
            alpha = easing_function(alpha)  # Apply the easing function to the alpha value

            crossfade_image = crossfade(image1, image2, alpha)
            crossfade_images.append(crossfade_image)
            
        # Convert crossfade_images to tensor
        crossfade_images = torch.stack(crossfade_images, dim=0)
        # Get the last frame result of the interpolation
        last_frame = crossfade_images[-1]
        # Calculate the number of remaining frames from images_2
        remaining_frames = len(images_2) - (transition_start_index + transitioning_frames)
        # Crossfade the remaining frames with the last used alpha value
        for i in range(remaining_frames):
            alpha = alphas[-1]
            image1 = images_1[i + transition_start_index + transitioning_frames]
            image2 = images_2[i + transition_start_index + transitioning_frames]
            easing_function = easing_functions.get(interpolation)
            alpha = easing_function(alpha)  # Apply the easing function to the alpha value

            crossfade_image = crossfade(image1, image2, alpha)
            crossfade_images = torch.cat([crossfade_images, crossfade_image.unsqueeze(0)], dim=0)
        # Append the beginning of images_1
        beginning_images_1 = images_1[:transition_start_index]
        crossfade_images = torch.cat([beginning_images_1, crossfade_images], dim=0)
        return (crossfade_images, )

```
