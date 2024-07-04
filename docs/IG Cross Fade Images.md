
# Documentation
- Class name: IG Cross Fade Images
- Category: 🐓 IG Nodes/Interpolation
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

IG Cross Fade Images节点用于创建一系列平滑过渡的图像，实现从一组图像到另一组图像的交叉淡入淡出效果。它利用缓动函数来调整过渡的节奏，从而实现各种动态视觉效果。

# Input types
## Required
- input_images
    - 需要进行交叉淡入淡出的图像张量列表。这是生成图像之间过渡效果的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- interpolation
    - 决定用于计算交叉淡入淡出效果的alpha值的缓动函数，影响过渡的动态效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- transitioning_frames
    - 指定用于每对图像之间过渡的帧数，影响交叉淡入淡出效果的平滑度。
    - Comfy dtype: INT
    - Python dtype: int
- repeat_count
    - 控制当前图像在过渡之前重复的次数，允许自定义动画的节奏。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 包含交叉淡入淡出图像序列的张量，表示输入图像之间的平滑过渡。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
