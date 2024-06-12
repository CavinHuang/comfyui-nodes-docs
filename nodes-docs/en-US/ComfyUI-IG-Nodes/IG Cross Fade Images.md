---
tags:
- AnimationScheduling
- VisualEffects
---

# 🧑🏻‍🧑🏿‍🧒🏽 IG Cross Fade Images
## Documentation
- Class name: `IG Cross Fade Images`
- Category: `🐓 IG Nodes/Interpolation`
- Output node: `False`

The IG Cross Fade Images node is designed to create a series of images that smoothly transition from one set to another using cross-fading effects. It leverages easing functions to adjust the transition's pace, allowing for a variety of dynamic visual effects.
## Input types
### Required
- **`input_images`**
    - A list of image tensors to be cross-faded. It serves as the primary input for generating the transition effects between images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`interpolation`**
    - Determines the easing function used to calculate the alpha values for the cross-fade effect, affecting the transition's dynamics.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`transitioning_frames`**
    - Specifies the number of frames dedicated to transitioning between each pair of images, influencing the smoothness of the cross-fade effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`repeat_count`**
    - Controls how many times the current image is repeated before transitioning, allowing for customization of the animation's pacing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - A tensor containing the sequence of cross-faded images, representing the smooth transition between the input images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class IG_CrossFadeImages:
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "main"
    CATEGORY = TREE_INTERP

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "input_images": ("IMAGE",),
                 "interpolation": (["linear", "ease_in", "ease_out", "ease_in_out", "bounce", "elastic", "glitchy", "exponential_ease_out"],),
                 "transitioning_frames": ("INT", {"default": 1,"min": 0, "max": 4096, "step": 1}),
                 "repeat_count": ("INT", {"default": 1,"min": 0, "max": 4096, "step": 1}),
        },
    } 
    
    def main(self, input_images, transitioning_frames, interpolation, repeat_count):

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

        # Assuming input_images is a list of tensors with shape [C, H, W]
        # Initialize an empty list to hold crossfaded images
        crossfade_images = []
        image_count = len(input_images)

        for i in range(image_count - 1):  # For each pair of images
            image1 = input_images[i]
            image2 = input_images[i + 1]
            for repeat in range(repeat_count - transitioning_frames):  # Repeat the current image
                crossfade_images.append(image1)
            alphas = torch.linspace(1.0 / (transitioning_frames + 1.0), 1.0 - 1.0 / (transitioning_frames + 1.0), transitioning_frames)
            for alpha in alphas:  # Transition to the next image
                easing_function = easing_functions[interpolation]
                eased_alpha = easing_function(alpha.item())
                crossfaded_image = crossfade(image1, image2, eased_alpha)
                crossfade_images.append(crossfaded_image)

        # Handle the last image repetition
        for repeat in range(repeat_count):
            crossfade_images.append(input_images[-1])
        # crossfade_images.append(last_image)

        crossfade_images = torch.stack(crossfade_images, dim=0)
    
        # If not at end, transition image
            

        # for i in range(transitioning_frames):
        #     alpha = alphas[i]
        #     image1 = images_1[i + transition_start_index]
        #     image2 = images_2[i + transition_start_index]
        #     easing_function = easing_functions.get(interpolation)
        #     alpha = easing_function(alpha)  # Apply the easing function to the alpha value

        #     crossfade_image = crossfade(image1, image2, alpha)
        #     crossfade_images.append(crossfade_image)
            
        # # Convert crossfade_images to tensor
        # crossfade_images = torch.stack(crossfade_images, dim=0)
        # # Get the last frame result of the interpolation
        # last_frame = crossfade_images[-1]
        # # Calculate the number of remaining frames from images_2
        # remaining_frames = len(images_2) - (transition_start_index + transitioning_frames)
        # # Crossfade the remaining frames with the last used alpha value
        # for i in range(remaining_frames):
        #     alpha = alphas[-1]
        #     image1 = images_1[i + transition_start_index + transitioning_frames]
        #     image2 = images_2[i + transition_start_index + transitioning_frames]
        #     easing_function = easing_functions.get(interpolation)
        #     alpha = easing_function(alpha)  # Apply the easing function to the alpha value

        #     crossfade_image = crossfade(image1, image2, alpha)
        #     crossfade_images = torch.cat([crossfade_images, crossfade_image.unsqueeze(0)], dim=0)
        # # Append the beginning of images_1
        # beginning_images_1 = images_1[:transition_start_index]
        # crossfade_images = torch.cat([beginning_images_1, crossfade_images], dim=0)
        return (crossfade_images, )

```
