
# Documentation
- Class name: JWLoadImageSequence
- Category: jamesWalker55
- Output node: False

该节点用于批量加载有指定停止索引的图像序列。它允许用户定义序列中的特定范围,从而实现高效处理和处理多个图像。

# Input types
## Required
- path_pattern
    - 指定用于定位和加载图像序列的模式或路径。该参数在识别要处理的文件方面起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- start_index
    - 定义加载图像序列的起始索引,决定了要包含在处理中的初始图像。
    - Comfy dtype: INT
    - Python dtype: int
- frame_count
    - 指示从起始索引开始要加载的帧数,控制要处理的图像序列的长度。
    - Comfy dtype: INT
    - Python dtype: int
- ignore_missing_images
    - 决定是否忽略指定范围内缺失的图像,允许灵活处理不完整的序列。
    - Comfy dtype: ['false', 'true']
    - Python dtype: bool

# Output types
- image
    - 输出是基于指定条件加载的图像批次,可供进一步处理或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWLoadImageSequence", "Batch Load Image Sequence")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "path_pattern": (
                "STRING",
                {"default": "./frame{:06d}.png", "multiline": False},
            ),
            "start_index": ("INT", {"default": 0, "min": 0, "step": 1}),
            "frame_count": ("INT", {"default": 16, "min": 1, "step": 1}),
            "ignore_missing_images": (("false", "true"), {"default": "false"}),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(
        self,
        path_pattern: str,
        start_index: int,
        frame_count: int,
        ignore_missing_images: str,
    ):
        ignore_missing_images: bool = ignore_missing_images == "true"

        # generate image paths to load
        image_paths = []
        for i in range(start_index, start_index + frame_count):
            try:
                image_paths.append(path_pattern.format(i))
            except KeyError:
                image_paths.append(path_pattern.format(i=i))

        if ignore_missing_images:
            # remove missing images
            image_paths = [p for p in image_paths if os.path.exists(p)]
        else:
            # early check for missing images
            for path in image_paths:
                if not os.path.exists(path):
                    raise FileNotFoundError(f"Image does not exist: {path}")

        if len(image_paths) == 0:
            raise RuntimeError("Image sequence empty - no images to load")

        imgs = []
        for path in image_paths:
            img = load_image(path)
            # img.shape => torch.Size([1, 768, 768, 3])
            imgs.append(img)

        imgs = torch.cat(imgs, dim=0)

        return (imgs,)

```
