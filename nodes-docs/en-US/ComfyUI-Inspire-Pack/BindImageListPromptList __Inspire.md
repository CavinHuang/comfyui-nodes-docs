---
tags:
- Prompt
---

# Bind [ImageList, PromptList] (Inspire)
## Documentation
- Class name: `BindImageListPromptList __Inspire`
- Category: `InspirePack/Prompt`
- Output node: `False`

The BindImageListPromptList node is designed to integrate image lists with corresponding prompt lists, facilitating the creation of enriched visual-textual datasets. This node aims to streamline the process of binding images with their respective prompts, enabling more efficient and organized handling of visual and textual data for creative or analytical purposes.
## Input types
### Required
- **`images`**
    - The 'images' parameter accepts a list of images to be bound with prompts, serving as the visual component of the dataset.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`zipped_prompts`**
    - The 'zipped_prompts' parameter takes a list of prompts (zipped format) to be associated with the images, acting as the textual component of the dataset.
    - Comfy dtype: `ZIPPED_PROMPT`
    - Python dtype: `List[Tuple[str, str, str]]`
- **`default_positive`**
    - The 'default_positive' parameter specifies a default positive prompt to be used when the number of prompts is less than the number of images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`default_negative`**
    - The 'default_negative' parameter specifies a default negative prompt to be used in similar circumstances as the default positive, ensuring coverage for all images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns the original list of images, maintaining the visual data integrity.
    - Python dtype: `List[torch.Tensor]`
- **`positive`**
    - Comfy dtype: `STRING`
    - Returns a list of positive prompts, each corresponding to an image, enriching the dataset with positive textual annotations.
    - Python dtype: `List[str]`
- **`negative`**
    - Comfy dtype: `STRING`
    - Returns a list of negative prompts, complementing the positive prompts by providing contrasting textual annotations for each image.
    - Python dtype: `List[str]`
- **`prompt_label`**
    - Comfy dtype: `STRING`
    - Returns a list of labels for the prompts, offering additional context or categorization for the bound image-prompt pairs.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BindImageListPromptList:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "zipped_prompts": ("ZIPPED_PROMPT",),
                "default_positive": ("STRING", {"multiline": True, "placeholder": "default positive"}),
                "default_negative": ("STRING", {"multiline": True, "placeholder": "default negative"}),
            }
        }

    INPUT_IS_LIST = True

    RETURN_TYPES = ("IMAGE", "STRING", "STRING", "STRING")
    RETURN_NAMES = ("image", "positive", "negative", "prompt_label")

    OUTPUT_IS_LIST = (True, True, True,)

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    def doit(self, images, zipped_prompts, default_positive, default_negative):
        positives = []
        negatives = []
        prompt_labels = []

        if len(images) < len(zipped_prompts):
            zipped_prompts = zipped_prompts[:len(images)]

        elif len(images) > len(zipped_prompts):
            lack = len(images) - len(zipped_prompts)
            default_prompt = (default_positive[0], default_negative[0], "default")
            zipped_prompts = zipped_prompts[:]
            for i in range(lack):
                zipped_prompts.append(default_prompt)

        for prompt in zipped_prompts:
            a, b, c = prompt
            positives.append(a)
            negatives.append(b)
            prompt_labels.append(c)

        return (images, positives, negatives, prompt_labels)

```
