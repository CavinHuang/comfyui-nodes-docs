---
tags:
- Image
- ImageBlend
- ImageComposite
---

# Image Batch Filmic Transitions
## Documentation
- Class name: `SaltFilmicTransitions`
- Category: `SALT/Scheduling/Image`
- Output node: `False`

The SaltFilmicTransitions node is designed to create visually appealing transitions between two sets of images, utilizing a variety of modes such as swipes and circle expansions. It allows for dynamic visual storytelling by seamlessly blending images together over a specified number of frames, with optional control over the transition's smoothness through a mask blur schedule.
## Input types
### Required
- **`images_a`**
    - The first set of images to transition from. These images serve as the starting point for the transition effect.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`images_b`**
    - The second set of images to transition to. These images serve as the destination for the transition effect.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`mode`**
    - Specifies the style of the transition, such as swipe directions or circle expansions, defining the visual effect used to blend the images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`transition_frames`**
    - The number of frames over which the transition occurs, determining the duration and smoothness of the effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`mask_blur_schedule`**
    - An optional schedule to control the blur intensity over the transition, allowing for finer visual tuning of the transition effect.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The resulting set of images after applying the transition effect, blended according to the specified mode and parameters.
    - Python dtype: `torch.Tensor`
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
