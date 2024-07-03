
# Documentation
- Class name: SaltScheduledBinaryComparison
- Category: SALT/Scheduling/Image
- Output node: False
- Repo Ref: Unknown/Unavailable

SaltScheduledBinaryComparison节点对一批图像执行定时二元比较，应用可选考虑误差范围（epsilon）的阈值操作。它根据提供的调度动态调整批次中每个图像的比较阈值，实现灵活的图像处理操作，可以随时间或跨不同图像而变化。

# Input types
## Required
- images
    - 要处理的图像批次。此参数对于定义将应用二元阈值操作的图像集至关重要，直接影响节点的执行和结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- comparison_schedule
    - 用作二元比较阈值的比较值调度表，适用于整个图像批次。这个调度表直接影响阈值操作，实现每个图像的动态调整。
    - Comfy dtype: LIST
    - Python dtype: List[float]

## Optional
- epsilon_schedule
    - 可选的epsilon值调度表，用于在比较中允许误差范围，使接近阈值的值也被视为匹配。此参数通过适应微小变化，为阈值操作增加了灵活性。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- use_epsilon
    - 决定是否在比较中使用epsilon误差范围的标志。这影响是否将接近阈值的值视为匹配，为二元比较增加了一层灵活性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- images
    - 二元阈值操作的结果，其中图像批次中的每个像素根据比较结果被设置为1或0。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
