# Deep Danbooru Caption
## Documentation
- Class name: `DeepDanbooruCaption`
- Category: `Art Venture/Utils`
- Output node: `False`

The DeepDanbooruCaption node is designed to generate captions for images using the DeepDanbooru model. It processes images to identify and describe their content with tags, optionally applying a prefix and suffix to each caption, and can be configured to filter tags, adjust thresholds, and sort tags alphabetically.
## Input types
### Required
- **`image`**
    - The image to be captioned. It is the primary input for generating captions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`threshold`**
    - The confidence threshold for including tags in the caption. Tags with confidence below this threshold are excluded.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sort_alpha`**
    - Determines whether the tags should be sorted alphabetically in the caption.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`use_spaces`**
    - Controls whether spaces should be used between tags in the caption.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`escape`**
    - Indicates whether special characters in tags should be escaped.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`filter_tags`**
    - A list of tags to be excluded from the captions.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
### Optional
- **`device_mode`**
    - Specifies the device mode (e.g., CPU, GPU, AUTO) for running the DeepDanbooru model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`prefix`**
    - A prefix to be added before each caption.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`suffix`**
    - A suffix to be added after each caption.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`enabled`**
    - Enables or disables the captioning functionality.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`caption`**
    - Comfy dtype: `STRING`
    - The generated captions for the input image, potentially modified by prefix and suffix.
    - Python dtype: `List[str]`
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
