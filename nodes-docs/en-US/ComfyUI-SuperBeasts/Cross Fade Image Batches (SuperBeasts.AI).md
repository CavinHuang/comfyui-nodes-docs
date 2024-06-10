---
tags:
- AnimationScheduling
- VisualEffects
---

# Cross Fade Image Batches (SuperBeasts.AI)
## Documentation
- Class name: `Cross Fade Image Batches (SuperBeasts.AI)`
- Category: `SuperBeastsAI/Animation`
- Output node: `False`

The Cross Fade Image Batches (SuperBeasts.AI) node is designed to blend two sequences of images (batches) together over a specified number of frames, using a cross-fading effect. This node allows for the creation of smooth transitions between image sequences by interpolating the pixel values of the images at the end of the first batch and the beginning of the second batch, according to a specified easing function and fade strength.
## Input types
### Required
- **`batch1`**
    - The first batch of images to be cross-faded. It represents the starting sequence of the transition.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`batch2`**
    - The second batch of images to be cross-faded. It represents the ending sequence of the transition.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`fade_frames`**
    - The number of frames over which the cross-fade effect should occur. This determines the length of the transition.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fade_strength`**
    - The strength of the fade effect, controlling how much the images from the two batches blend together.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ease_type`**
    - The type of easing function to use for the fade effect, such as linear, ease_in, ease_out, or ease_in_out, which affects the transition's smoothness.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting batch of images after applying the cross-fade effect, combining non-faded, faded, and remaining frames.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CrossFadeImageBatches:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "batch1": ("IMAGE",),
                "batch2": ("IMAGE",),
                "fade_frames": ("INT", {"default": 10, "min": 1, "max": 100, "step": 1}),
                "fade_strength": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "ease_type": (["linear", "ease_in", "ease_out", "ease_in_out"], {"default": "linear"}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "crossfade"
    CATEGORY = "SuperBeastsAI/Animation"

    def crossfade(self, batch1, batch2, fade_frames=10, fade_strength=0.5, ease_type="linear"):
        num_frames_batch1 = batch1.shape[0]
        num_frames_batch2 = batch2.shape[0]

        if num_frames_batch1 < fade_frames or num_frames_batch2 < fade_frames:
            raise ValueError("The number of fade frames must be less than or equal to the number of frames in each batch.")

        if batch1.shape[2:] != batch2.shape[2:]:
            raise ValueError("The spatial dimensions of batch1 and batch2 must match. Please resize the batches to the same size before using this node.")

        # Extract the frames to be faded from each batch
        fade_frames_batch1 = batch1[-fade_frames:]
        fade_frames_batch2 = batch2[:fade_frames]

        # Generate the interpolation weights based on the selected easing function
        if ease_type == "linear":
            weights = torch.linspace(0, 1, fade_frames)
        elif ease_type == "ease_in":
            weights = torch.pow(torch.linspace(0, 1, fade_frames), 2)
        elif ease_type == "ease_out":
            weights = 1 - torch.pow(torch.linspace(1, 0, fade_frames), 2)
        elif ease_type == "ease_in_out":
            weights = 0.5 * (1 - torch.cos(torch.linspace(0, torch.pi, fade_frames)))

        weights = weights.view(-1, 1, 1, 1)  # Reshape weights to match the dimensions of the frames

        # Perform the cross-fade between the fade frames of each batch
        faded_frames = fade_frames_batch1 * (1 - weights * fade_strength) + fade_frames_batch2 * (weights * fade_strength)

        # Combine the non-faded frames from batch1, the faded frames, and the remaining frames from batch2
        output_batch = torch.cat((batch1[:-fade_frames], faded_frames, batch2[fade_frames:]), dim=0)

        return (output_batch,)

```
