
# Documentation
- Class name: Deflicker (SuperBeasts.AI)
- Category: SuperBeastsAI/Animation
- Output node: False

Deflicker节点旨在通过根据周围图像的平均亮度来调整单个图像的亮度，从而减少图像序列中的闪烁现象。它还结合了降噪、梯度平滑和抖动等额外的图像处理技术，以提升输出的视觉质量。

# Input types
## Required
- images
    - 需要进行闪烁减少处理的图像序列。这个输入对于确定上下文并对每张图像进行必要的调整至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- context_length
    - 指定在计算平均亮度时需要考虑的当前图像周围的图像数量，影响闪烁校正的强度。
    - Comfy dtype: INT
    - Python dtype: int
- brightness_threshold
    - 触发调整的当前图像与上下文平均亮度之间的最小亮度差异，控制对闪烁的敏感度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blending_strength
    - 决定原始图像和处理后图像之间的混合强度，影响去闪烁效果的微妙程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_reduction_strength
    - 控制应用于每张图像的降噪程度，提高清晰度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- gradient_smoothing_strength
    - 调整梯度平滑的程度，以减少视觉噪声并提高图像连贯性。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 一次处理的图像数量，影响性能和内存使用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 应用去闪烁和额外图像增强后的图像序列，可用于进一步处理或显示。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Deflicker:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "context_length": ("INT", {"default": 5, "min": 1, "max": 20, "step": 1}),
                "brightness_threshold": ("FLOAT", {"default": 0.05, "min": 0.01, "max": 0.5, "step": 0.01}),
                "blending_strength": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 1.0, "step": 0.01}),
                "noise_reduction_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 5.0, "step": 0.1}),
                "gradient_smoothing_strength": ("INT", {"default": 1, "min": 0, "max": 3, "step": 1}),
                "batch_size": ("INT", {"default": 10, "min": 1, "max": 100, "step": 1})
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "deflicker"
    CATEGORY = "SuperBeastsAI/Animation"

    def deflicker(self, images, context_length=5, brightness_threshold=0.05, blending_strength=0.5,
                  noise_reduction_strength=1.0, gradient_smoothing_strength=1, batch_size=10):
        num_frames = len(images)
        adjusted_tensor = []

        for i in range(0, num_frames, batch_size):
            batch_images = images[i:i+batch_size]

            # Convert batch tensor to a list of PIL images
            pil_images = [tensor2pil(image) for image in batch_images]

            adjusted_images = []

            for j in range(len(pil_images)):
                current_image = pil_images[j]
                context_start = max(0, i + j - context_length // 2)
                context_end = min(num_frames, i + j + context_length // 2 + 1)
                context_images = images[context_start:context_end]

                current_brightness = get_average_brightness(current_image)
                context_brightnesses = [get_average_brightness(tensor2pil(img)) for img in context_images]
                average_brightness = np.mean(context_brightnesses)

                if abs(current_brightness - average_brightness) > brightness_threshold:
                    brightness_factor = calculate_brightness_factor(average_brightness, current_brightness)
                    adjusted_image = adjust_brightness(current_image, brightness_factor)
                else:
                    adjusted_image = current_image

                # Apply noise reduction to the adjusted image
                denoised_image = apply_noise_reduction(adjusted_image, noise_reduction_strength)

                # Apply gradient smoothing to the denoised image
                smoothed_image = apply_gradient_smoothing(denoised_image, gradient_smoothing_strength)

                # Apply dithering to the smoothed image
                dithered_image = apply_dithering(smoothed_image)

                # Blend the dithered image with the original image using adaptive blending
                blending_alpha = min(1.0, blending_strength * (1.0 + abs(current_brightness - average_brightness)))
                blended_image = blend_images(current_image, dithered_image, blending_alpha)

                adjusted_images.append(blended_image)

            # Convert the adjusted PIL images back to a tensor
            adjusted_batch_tensor = torch.cat([pil2tensor(img) for img in adjusted_images], dim=0)
            adjusted_tensor.append(adjusted_batch_tensor)

        # Concatenate the adjusted batches along the first dimension
        adjusted_tensor = torch.cat(adjusted_tensor, dim=0)

        return (adjusted_tensor,)

```
