
# Documentation
- Class name: DeepDanbooruCaption
- Category: Art Venture/Utils
- Output node: False

DeepDanbooruCaption节点旨在使用DeepDanbooru模型为图像生成说明文字。它处理图像以识别和描述其内容，使用标签，可选择性地为每个说明文字添加前缀和后缀，并可配置为过滤标签、调整阈值和按字母顺序排序标签。

# Input types
## Required
- image
    - 需要生成说明文字的图像。这是生成说明文字的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- threshold
    - 在说明文字中包含标签的置信度阈值。置信度低于此阈值的标签将被排除。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sort_alpha
    - 决定说明文字中的标签是否应按字母顺序排序。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- use_spaces
    - 控制说明文字中标签之间是否应使用空格。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- escape
    - 指示是否应对标签中的特殊字符进行转义。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- filter_tags
    - 要从说明文字中排除的标签列表。
    - Comfy dtype: STRING
    - Python dtype: List[str]
## Optional
- device_mode
    - 指定运行DeepDanbooru模型的设备模式（如CPU、GPU、AUTO）。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- prefix
    - 添加到每个说明文字之前的前缀。
    - Comfy dtype: STRING
    - Python dtype: str
- suffix
    - 添加到每个说明文字之后的后缀。
    - Comfy dtype: STRING
    - Python dtype: str
- enabled
    - 启用或禁用说明文字生成功能。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- caption
    - 为输入图像生成的说明文字，可能会被前缀和后缀修改。
    - Comfy dtype: STRING
    - Python dtype: List[str]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DeepDanbooruCaption:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "threshold": ("FLOAT", {"default": 0.5, "min": 0, "max": 1, "step": 0.01}),
                "sort_alpha": ("BOOLEAN", {"default": True}),
                "use_spaces": ("BOOLEAN", {"default": True}),
                "escape": ("BOOLEAN", {"default": True}),
                "filter_tags": ("STRING", {"default": "blacklist", "multiline": True}),
            },
            "optional": {
                "device_mode": (["AUTO", "Prefer GPU", "CPU"],),
                "prefix": ("STRING", {"default": ""}),
                "suffix": ("STRING", {"default": ""}),
                "enabled": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("caption",)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "caption"
    CATEGORY = "Art Venture/Utils"

    def caption(
        self,
        image,
        threshold,
        sort_alpha,
        use_spaces,
        escape,
        filter_tags,
        device_mode="AUTO",
        prefix="",
        suffix="",
        enabled=True,
    ):
        if not enabled:
            return ([join_caption("", prefix, suffix)],)

        model = load_danbooru(device_mode)

        try:
            captions = []

            for img in image:
                img = tensor2pil(img)
                img = resize_image(img.convert("RGB"), 512, 512, resize_mode=2)
                arr = np.expand_dims(np.array(img, dtype=np.float32), 0) / 255

                with torch.no_grad():
                    x = torch.from_numpy(arr).to(gpu)
                    y = model(x)[0].detach().cpu().numpy()

                probability_dict = {}

                for tag, probability in zip(model.tags, y):
                    if probability < threshold:
                        continue

                    if tag.startswith("rating:"):
                        continue

                    probability_dict[tag] = probability

                if sort_alpha:
                    tags = sorted(probability_dict)
                else:
                    tags = [tag for tag, _ in sorted(probability_dict.items(), key=lambda x: -x[1])]

                res = []
                filtertags = {x.strip().replace(" ", "_") for x in filter_tags.split(",")}

                for tag in [x for x in tags if x not in filtertags]:
                    probability = probability_dict[tag]
                    tag_outformat = tag
                    if use_spaces:
                        tag_outformat = tag_outformat.replace("_", " ")
                    if escape:
                        tag_outformat = re.sub(re_special, r"\\\1", tag_outformat)

                    res.append(tag_outformat)

                caption = ", ".join(res)
                caption = join_caption(caption, prefix, suffix)
                captions.append(caption)

            return (captions,)
        except:
            raise
        finally:
            unload_danbooru()

```
