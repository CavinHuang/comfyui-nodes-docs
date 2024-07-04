
# Documentation
- Class name: Pixel Deflicker (SuperBeasts.AI)
- Category: SuperBeastsAI/Animation
- Output node: False

Pixel Deflicker节点旨在减少图像序列中的闪烁现象，提高帧间的视觉一致性。它结合了时间平滑和自适应混合技术，以缓解快速的亮度变化，从而实现更平滑的过渡效果和更高的图像质量。

# Input types
## Required
- images
    - 需要进行闪烁减少处理的图像批次。这个输入对于识别和缓解序列中的闪烁效果至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- window_size
    - 指定用于时间平滑的窗口大小，影响跨帧闪烁减少的程度。
    - Comfy dtype: INT
    - Python dtype: int
- blending_strength
    - 控制原始帧和平滑帧之间的混合强度，允许对闪烁缓解效果进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - 决定一次处理的图像数量，影响节点的执行效率。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 包含经过闪烁减少处理后的图像批次的输出张量，展示了增强的视觉一致性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
