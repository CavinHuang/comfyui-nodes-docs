
# Documentation
- Class name: JWLoadImageSequenceWithStopIndex
- Category: jamesWalker55
- Output node: False
- Repo Ref: https://github.com/jamesWalker55/comfyui-various-scripts

JWLoadImageSequenceWithStopIndex节点设计用于批量加载指定起始和结束索引的图像序列，可选择是否包含结束索引以及是否忽略缺失的图像。它支持从文件系统动态加载图像序列，为图像处理工作流程提供灵活的数据处理能力。

# Input types
## Required
- path_pattern
    - 指定用于定位要加载图像的模式或路径，使用占位符表示索引。
    - Comfy dtype: STRING
    - Python dtype: str
- start_index
    - 定义要加载的图像序列的起始索引。
    - Comfy dtype: INT
    - Python dtype: int
- stop_index
    - 设置图像序列加载的结束索引，确定要包含的图像范围。
    - Comfy dtype: INT
    - Python dtype: int
- inclusive
    - 决定是否将结束索引包含在加载序列中，允许选择包含或排除范围。
    - Comfy dtype: ['false', 'true']
    - Python dtype: str
- ignore_missing_images
    - 控制是否忽略指定范围内缺失的图像，实现对不完整序列的健壮处理。
    - Comfy dtype: ['false', 'true']
    - Python dtype: str

# Output types
- image
    - 以张量形式返回加载的图像序列，可用于进一步处理或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
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
