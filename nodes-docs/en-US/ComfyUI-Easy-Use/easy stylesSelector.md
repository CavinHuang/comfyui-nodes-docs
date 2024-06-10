---
tags:
- Prompt
- PromptStyling
---

# Styles Selector
## Documentation
- Class name: `easy stylesSelector`
- Category: `EasyUse/Prompt`
- Output node: `True`

The `easy stylesSelector` node is designed to facilitate the selection and application of various styles to prompts within the ComfyUI framework. It allows users to dynamically choose from a predefined set of styles, applying them to enhance or modify the prompt's appearance or thematic direction based on the selected options.
## Input types
### Required
- **`styles`**
    - Specifies the style or styles to be applied. This can include a single style or a combination of styles, influencing the overall aesthetic or thematic direction of the prompt.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`positive`**
    - The positive prompt text to which styles will be applied, enhancing its thematic or aesthetic appeal.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative`**
    - The negative prompt text to which styles can be applied, potentially altering its thematic or aesthetic direction.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`positive`**
    - Comfy dtype: `STRING`
    - The enhanced positive prompt text after style application.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `STRING`
    - The modified negative prompt text following style application.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class stylesPromptSelector:

    @classmethod
    def INPUT_TYPES(s):
        styles = ["fooocus_styles"]
        styles_dir = FOOOCUS_STYLES_DIR
        for file_name in os.listdir(styles_dir):
            file = os.path.join(styles_dir, file_name)
            if os.path.isfile(file) and file_name.endswith(".json") and "styles" in file_name.split(".")[0]:
                styles.append(file_name.split(".")[0])
        return {
            "required": {
               "styles": (styles, {"default": "fooocus_styles"}),
            },
            "optional": {
                "positive": ("STRING", {"forceInput": True}),
                "negative": ("STRING", {"forceInput": True}),
            },
            "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID"},
        }

    RETURN_TYPES = ("STRING", "STRING",)
    RETURN_NAMES = ("positive", "negative",)

    CATEGORY = 'EasyUse/Prompt'
    FUNCTION = 'run'
    OUTPUT_NODE = True


    def replace_repeat(self, prompt):
        prompt = prompt.replace("，", ",")
        arr = prompt.split(",")
        if len(arr) != len(set(arr)):
            all_weight_prompt = re.findall(re.compile(r'[(](.*?)[)]', re.S), prompt)
            if len(all_weight_prompt) > 0:
                # others_prompt = prompt
                # for w_prompt in all_weight_prompt:
                # others_prompt = others_prompt.replace('(','').replace(')','')
                # print(others_prompt)
                return prompt
            else:
                for i in range(len(arr)):
                    arr[i] = arr[i].strip()
                arr = list(set(arr))
                return ", ".join(arr)
        else:
            return prompt

    def run(self, styles, positive='', negative='', prompt=None, extra_pnginfo=None, my_unique_id=None):
        values = []
        all_styles = {}
        positive_prompt, negative_prompt = '', negative
        if styles == "fooocus_styles":
            file = os.path.join(RESOURCES_DIR,  styles + '.json')
        else:
            file = os.path.join(FOOOCUS_STYLES_DIR, styles + '.json')
        f = open(file, 'r', encoding='utf-8')
        data = json.load(f)
        f.close()
        for d in data:
            all_styles[d['name']] = d
        if my_unique_id in prompt:
            if prompt[my_unique_id]["inputs"]['select_styles']:
                values = prompt[my_unique_id]["inputs"]['select_styles'].split(',')

        has_prompt = False
        if len(values) == 0:
            return (positive, negative)

        for index, val in enumerate(values):
            if 'prompt' in all_styles[val]:
                if "{prompt}" in all_styles[val]['prompt'] and has_prompt == False:
                    positive_prompt = all_styles[val]['prompt'].format(prompt=positive)
                    has_prompt = True
                else:
                    positive_prompt += ', ' + all_styles[val]['prompt'].replace(', {prompt}', '').replace('{prompt}', '')
            if 'negative_prompt' in all_styles[val]:
                negative_prompt += ', ' + all_styles[val]['negative_prompt'] if negative_prompt else all_styles[val]['negative_prompt']

        if has_prompt == False and positive:
            positive_prompt = positive + ', '

        # 去重
        positive_prompt = self.replace_repeat(positive_prompt) if positive_prompt else ''
        negative_prompt = self.replace_repeat(negative_prompt) if negative_prompt else ''

        return (positive_prompt, negative_prompt)

```
