# WD14 Tagger 🐍
## Documentation
- Class name: `WD14Tagger|pysssss`
- Category: `image`
- Output node: `True`

The WD14Tagger node is designed to analyze images and generate tags based on their content, utilizing a model trained for this purpose. It supports customization of the tagging process through various parameters, allowing for tailored outputs that can include or exclude specific tags, adjust sensitivity thresholds, and format the output according to user preferences.
## Input types
### Required
- **`image`**
    - The image to be analyzed and tagged. This is the primary input for the tagging process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image.Image`
- **`model`**
    - Specifies the model to use for tagging. The node supports using different models, allowing for flexibility in the tagging process based on available models.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`threshold`**
    - Sets the minimum confidence level for general tags to be included in the output. Helps filter out less relevant tags.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`character_threshold`**
    - Sets the minimum confidence level for character-specific tags to be included in the output. This allows for more precise control over which character tags are considered relevant.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`replace_underscore`**
    - Determines whether underscores in tags should be replaced with spaces, affecting the readability of the output tags.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`trailing_comma`**
    - Controls whether a trailing comma is added to the tags in the output, influencing the formatting of the generated tag string.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`exclude_tags`**
    - Allows specifying tags to be excluded from the output, enabling users to filter out unwanted or irrelevant tags.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output type 'string' represents the formatted string of generated tags for the image, which was not explicitly listed but is implied by the node's functionality.
    - Python dtype: `str`
- **`ui`**
    - Provides a user interface component displaying the generated tags for the image.
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)



## Source code
```python
class WD14Tagger:
    @classmethod
    def INPUT_TYPES(s):
        extra = [name for name, _ in (os.path.splitext(m) for m in get_installed_models()) if name not in known_models]
        models = known_models + extra
        return {"required": {
            "image": ("IMAGE", ),
            "model": (models, { "default": defaults["model"] }),
            "threshold": ("FLOAT", {"default": defaults["threshold"], "min": 0.0, "max": 1, "step": 0.05}),
            "character_threshold": ("FLOAT", {"default": defaults["character_threshold"], "min": 0.0, "max": 1, "step": 0.05}),
            "replace_underscore": ("BOOLEAN", {"default": defaults["replace_underscore"]}),
            "trailing_comma": ("BOOLEAN", {"default": defaults["trailing_comma"]}),
            "exclude_tags": ("STRING", {"default": defaults["exclude_tags"]}),
        }}

    RETURN_TYPES = ("STRING",)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "tag"
    OUTPUT_NODE = True

    CATEGORY = "image"

    def tag(self, image, model, threshold, character_threshold, exclude_tags="", replace_underscore=False, trailing_comma=False):
        tensor = image*255
        tensor = np.array(tensor, dtype=np.uint8)

        pbar = comfy.utils.ProgressBar(tensor.shape[0])
        tags = []
        for i in range(tensor.shape[0]):
            image = Image.fromarray(tensor[i])
            tags.append(wait_for_async(lambda: tag(image, model, threshold, character_threshold, exclude_tags, replace_underscore, trailing_comma)))
            pbar.update(1)
        return {"ui": {"tags": tags}, "result": (tags,)}

```
