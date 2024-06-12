---
tags:
- AnimationScheduling
- VisualEffects
---

# Pixel Deflicker (SuperBeasts.AI)
## Documentation
- Class name: `Pixel Deflicker (SuperBeasts.AI)`
- Category: `SuperBeastsAI/Animation`
- Output node: `False`

The Pixel Deflicker node is designed to reduce flickering in sequences of images, enhancing visual consistency across frames. It employs a blend of temporal smoothing and adaptive blending techniques to mitigate rapid brightness variations, resulting in smoother transitions and improved image quality.
## Input types
### Required
- **`images`**
    - A batch of images to be processed for flicker reduction. This input is crucial for identifying and mitigating flickering effects across the sequence.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`window_size`**
    - Specifies the size of the window used for temporal smoothing, affecting the extent of flicker reduction across frames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blending_strength`**
    - Controls the intensity of blending between original and smoothed frames, allowing for fine-tuning of the flicker mitigation effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`batch_size`**
    - Determines the number of images processed at a time, impacting the node's execution efficiency.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output tensor containing the batch of images after flicker reduction, showcasing enhanced visual consistency.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PixelDeflicker:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "window_size": ("INT", {"default": 2, "min": 1, "max": 20, "step": 1}),
                "blending_strength": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 1.0, "step": 0.01}),
                "batch_size": ("INT", {"default": 10, "min": 1, "max": 100, "step": 1})
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "pixelDeflicker"

    CATEGORY = "SuperBeastsAI/Animation"

    def pixelDeflicker(self, images, window_size=5, blending_strength=0.5, batch_size=10):
        num_frames = len(images)
        blended_tensor = []

        for i in range(0, num_frames, batch_size):
            batch_images = images[i:i+batch_size]

            # Convert batch tensor to a list of PIL images
            pil_images = [tensor2pil(image) for image in batch_images]

            # Convert PIL images to numpy arrays
            numpy_frames = [np.array(img) / 255.0 for img in pil_images]

            # Apply temporal smoothing to the numpy frames
            smoothed_frames = temporal_smoothing(numpy_frames, window_size)

            # Blend the smoothed frames with the original frames
            blended_frames = [
                np.clip(original * (1 - blending_strength) + smoothed * blending_strength, 0, 1)
                for original, smoothed in zip(numpy_frames, smoothed_frames)
            ]

            # Convert the blended frames back to PIL images
            blended_pil_images = [Image.fromarray((frame * 255).astype(np.uint8)) for frame in blended_frames]

            # Convert the blended PIL images back to a tensor
            blended_batch_tensor = torch.cat([pil2tensor(img) for img in blended_pil_images], dim=0)

            blended_tensor.append(blended_batch_tensor)

        # Concatenate the blended batches along the first dimension
        blended_tensor = torch.cat(blended_tensor, dim=0)

        return (blended_tensor,)

```
