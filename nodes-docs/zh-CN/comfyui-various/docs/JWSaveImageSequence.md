
# Documentation
- Class name: JWSaveImageSequence
- Category: jamesWalker55
- Output node: True

JWSaveImageSequence节点设计用于批量保存图像序列到指定路径,允许自定义文件命名、索引编号,并提供覆盖现有文件的选项。它可以有组织地输出图像数据,并支持为每个保存的图像添加额外的元数据和提示信息。

# Input types
## Required
- images
    - 要保存的图像张量。这个集合代表将在批处理操作中保存的图像序列。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- path_pattern
    - 定义保存序列中每个图像的文件命名约定和路径的字符串模式。支持使用格式化语法来包含索引。
    - Comfy dtype: STRING
    - Python dtype: str
- start_index
    - 用于命名已保存图像文件的起始索引,它与路径模式结合使用来生成文件名。
    - Comfy dtype: INT
    - Python dtype: int
- overwrite
    - 指示是否应覆盖目标保存位置的现有文件的字符串。接受'true'或'false'作为值。
    - Comfy dtype: ['false', 'true']
    - Python dtype: str

# Output types
该节点没有输出类型


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
