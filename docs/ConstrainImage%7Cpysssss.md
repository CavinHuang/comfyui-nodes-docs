# Constrain Image 🐍
## Documentation
- Class name: ConstrainImage|pysssss
- Category: image
- Output node: False
- Repo Ref: https://github.com/pythongosssss/ComfyUI-Custom-Scripts

此节点旨在调整图像的尺寸以适应指定的最大和最小尺寸，同时保持图像的纵横比。如果图像超过最大尺寸，它可以选择性地裁剪图像。

## Input types
### Required
- images
    - 要约束的图像。此参数至关重要，因为它直接影响节点的核心功能，即调整大小和潜在裁剪图像以满足指定的尺寸约束。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]
- max_width
    - 指定图像在处理后可以具有的最大宽度。它在确定图像是否以及如何需要调整大小方面起关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- max_height
    - 定义图像在处理后可以具有的最大高度，影响调整大小逻辑以确保图像适合指定的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- min_width
    - 设置图像应具有的最小宽度，确保图像不会调整到低于此宽度。
    - Comfy dtype: INT
    - Python dtype: int
- min_height
    - 决定图像应具有的最小高度，防止图像调整到低于此高度。
    - Comfy dtype: INT
    - Python dtype: int
- crop_if_required
    - 一个标志，指示如果图像超过最大尺寸，是否应裁剪图像，影响最终输出可能会改变图像的构图。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool

## Output types
- image
    - Comfy dtype: IMAGE
    - 已处理的图像，调整大小并在必要时裁剪以适应指定的约束。
    - Python dtype: List[Image]

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class ConstrainImage:
    """
    A node that constrains an image to a maximum and minimum size while maintaining aspect ratio.
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "max_width": ("INT", {"default": 1024, "min": 0}),
                "max_height": ("INT", {"default": 1024, "min": 0}),
                "min_width": ("INT", {"default": 0, "min": 0}),
                "min_height": ("INT", {"default": 0, "min": 0}),
                "crop_if_required": (["yes", "no"], {"default": "no"}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "constrain_image"
    CATEGORY = "image"
    OUTPUT_IS_LIST = (True,)

    def constrain_image(self, images, max_width, max_height, min_width, min_height, crop_if_required):
        crop_if_required = crop_if_required == "yes"
        results = []
        for image in images:
            i = 255. * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8)).convert("RGB")

            current_width, current_height = img.size
            aspect_ratio = current_width / current_height

            constrained_width = max(min(current_width, min_width), max_width)
            constrained_height = max(min(current_height, min_height), max_height)

            if constrained_width / constrained_height > aspect_ratio:
                constrained_width = max(int(constrained_height * aspect_ratio), min_width)
                if crop_if_required:
                    constrained_height = int(current_height / (current_width / constrained_width))
            else:
                constrained_height = max(int(constrained_width / aspect_ratio), min_height)
                if crop_if_required:
                    constrained_width = int(current_width / (current_height / constrained_height))

            resized_image = img.resize((constrained_width, constrained_height), Image.LANCZOS)

            if crop_if_required and (constrained_width > max_width or constrained_height > max_height):
                left = max((constrained_width - max_width) // 2, 0)
                top = max((constrained_height - max_height) // 2, 0)
                right = min(constrained_width, max_width) + left
                bottom = min(constrained_height, max_height) + top
                resized_image = resized_image.crop((left, top, right, bottom))

            resized_image = np.array(resized_image).astype(np.float32) / 255.0
            resized_image = torch.from_numpy(resized_image)[None,]
            results.append(resized_image)

        return (results,)