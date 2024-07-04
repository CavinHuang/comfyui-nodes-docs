
# Documentation
- Class name: JWImageSequenceExtractFromBatch
- Category: jamesWalker55
- Output node: False

JWImageSequenceExtractFromBatch节点旨在从图像批次中提取指定范围的图像序列。通过设定起始和结束索引，用户可以灵活地从大型图像集合中选择性地获取特定子集，从而便于对特定图像数据进行后续操作和分析。该节点的设计增强了图像批处理的灵活性和精确控制能力。

# Input types
## Required
- images
    - 该参数是图像提取操作的核心输入，代表待处理的图像批次。它直接决定了可供选择的图像范围，对节点的功能实现至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- i_start
    - i_start参数指定了序列提取的起始位置，决定了输出序列中的第一张图像。它在控制提取范围方面起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- i_stop
    - i_stop参数标记了序列提取的结束位置，影响输出序列的最后一张图像。它与i_start共同定义了提取的图像范围。
    - Comfy dtype: INT
    - Python dtype: int
- inclusive
    - inclusive参数是一个布尔标志，决定是否将结束索引对应的图像包含在提取结果中。这为用户提供了更精细的控制选项。
    - Comfy dtype: ['false', 'true']
    - Python dtype: str

# Output types
- image
    - 输出的image是一个张量，包含了根据指定索引范围从原始批次中提取的图像序列。这个输出为后续的图像处理和分析提供了基础。
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
