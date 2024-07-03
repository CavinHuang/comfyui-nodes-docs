
# Documentation
- Class name: SaltFilmicTransitions
- Category: SALT/Scheduling/Image
- Output node: False

SaltFilmicTransitions节点旨在创建两组图像之间视觉上吸引人的过渡效果，利用各种模式如滑动和圆形扩展等。它通过在指定数量的帧上无缝地混合图像，实现动态的视觉叙事，并可通过遮罩模糊调度来选择性地控制过渡的平滑度。

# Input types
## Required
- images_a
    - 要进行过渡的第一组图像。这些图像作为过渡效果的起点。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- images_b
    - 要过渡到的第二组图像。这些图像作为过渡效果的终点。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- mode
    - 指定过渡的风格，如滑动方向或圆形扩展，定义用于混合图像的视觉效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- transition_frames
    - 过渡发生的帧数，决定效果的持续时间和平滑度。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- mask_blur_schedule
    - 一个可选的调度，用于控制过渡过程中的模糊强度，允许对过渡效果进行更精细的视觉调整。
    - Comfy dtype: LIST
    - Python dtype: List[float]

# Output types
- images
    - 应用过渡效果后得到的图像集，根据指定的模式和参数进行混合。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltFilmicTransitions:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images_a": ("IMAGE", ),
                "images_b": ("IMAGE", ),
                "mode": (["sipe_left", "swipe_right", "swipe_up", "swipe_down", "diagonal_tl_br", "diagonal_tr_bl", "diagonal_bl_tr", "diagonal_br_tl", "circle_expand", "circle_contract"],),
                "transition_frames": ("INT", {"min": 2, "max": 1024, "default": 10}),
            },
            "optional": {
                "mask_blur_schedule": ("LIST", ),
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)

    FUNCTION = "generate_transition"
    CATEGORY = "SALT/Scheduling/Image"

    def generate_transition(self, images_a, images_b, mode, transition_frames, mask_blur_schedule=[0]):
        mask_blur_schedule = [float(val) for val in mask_blur_schedule]
        img_list_a = [tensor2pil(img) for img in images_a]
        img_list_b = [tensor2pil(img) for img in images_b]
        transition = ImageBatchTransition(img_list_a, img_list_b, frames_per_transition=int(transition_frames), blur_radius=mask_blur_schedule, mode=mode)
        result_images = transition.create_transition()
        result_images = [pil2tensor(img) for img in result_images]
        return (torch.cat(result_images, dim=0), )

```
