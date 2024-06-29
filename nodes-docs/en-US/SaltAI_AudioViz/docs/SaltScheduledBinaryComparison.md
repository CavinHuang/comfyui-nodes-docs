---
tags:
- Scheduling
---

# Scheduled Binary Comparison
## Documentation
- Class name: `SaltScheduledBinaryComparison`
- Category: `SALT/Scheduling/Image`
- Output node: `False`

This node performs scheduled binary comparisons on a batch of images, applying a thresholding operation that can optionally consider a margin of error (epsilon). It dynamically adjusts the comparison threshold for each image in the batch based on a provided schedule, allowing for flexible image processing operations that can vary over time or across different images.
## Input types
### Required
- **`images`**
    - The batch of images to be processed. This parameter is crucial for defining the set of images on which the binary thresholding operation will be applied, affecting the node's execution and results.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`comparison_schedule`**
    - A schedule of comparison values to apply as thresholds for the binary comparison across the batch of images. This schedule directly influences the thresholding operation, enabling dynamic adjustments per image.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
### Optional
- **`epsilon_schedule`**
    - An optional schedule of epsilon values to allow for a margin of error in the comparison, enabling near-threshold values to be considered as matches. This parameter adds flexibility to the thresholding operation by accommodating slight variations.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`use_epsilon`**
    - A flag to determine whether the epsilon margin of error should be used in the comparison. This affects whether near-threshold values are considered as matches, adding a layer of flexibility to the binary comparison.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The result of the binary thresholding operation, where each pixel in the batch of images is set to either 1 or 0 based on the comparison outcome.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduledBinaryComparison:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "comparison_schedule": ("LIST",),
            },
            "optional": {
                "epsilon_schedule": ("LIST", {}),
                "use_epsilon": ("BOOLEAN", {"default": True})
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)

    FUNCTION = "binary_threshold"
    CATEGORY = "SALT/Scheduling/Image"

    def binary_threshold(self, images, comparison_schedule, epsilon_schedule=[0.1], use_epsilon=True):
        batch_size = images.shape[0]

        if len(comparison_schedule) < batch_size:
            last_val = comparison_schedule[-1]
            comparison_schedule.extend([last_val] * (batch_size - len(comparison_schedule)))
        comparison_schedule = comparison_schedule[:batch_size]

        thresholds_tensor = torch.tensor(comparison_schedule, dtype=images.dtype).view(batch_size, 1, 1, 1)
        
        if use_epsilon:
            if epsilon_schedule is None:
                epsilon_schedule = [0.1] * batch_size
            if len(epsilon_schedule) < batch_size:
                last_eps = epsilon_schedule[-1]
                epsilon_schedule.extend([last_eps] * (batch_size - len(epsilon_schedule)))
            epsilon_schedule = epsilon_schedule[:batch_size]
            epsilon_tensor = torch.tensor(epsilon_schedule, dtype=images.dtype).view(batch_size, 1, 1, 1)
            
            condition_met = ((images == thresholds_tensor) |
                             (torch.abs(images - thresholds_tensor) <= epsilon_tensor))
        else:
            condition_met = images >= thresholds_tensor

        thresholded_images = torch.where(condition_met, torch.tensor(1.0, dtype=images.dtype), torch.tensor(0.0, dtype=images.dtype))

        return (thresholded_images, )

```
