---
tags:
- RandomGeneration
---

# Text Random Prompt
## Documentation
- Class name: `Text Random Prompt`
- Category: `WAS Suite/Text`
- Output node: `False`

This node generates a random prompt based on a given search seed by querying the Lexica.art API. It abstracts the complexity of fetching and selecting random art-related prompts, providing a streamlined way to inspire creative outputs.
## Input types
### Required
- **`search_seed`**
    - The search seed is a string that guides the generation of the random prompt. It influences the thematic direction of the resulting prompt, making the node's output somewhat predictable and tailored.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is a text prompt derived from randomly selected art-related images fetched from the Lexica.art API. It serves as a creative seed for further artistic or textual generation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_Random_Prompt:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "search_seed": ("STRING", {"multiline": False}),
            }
        }

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "random_prompt"

    CATEGORY = "WAS Suite/Text"

    def random_prompt(self, search_seed=None):
        if search_seed in ['', ' ']:
            search_seed = None
        return (self.search_lexica_art(search_seed), )

    def search_lexica_art(self, query=None):
        if not query:
            query = random.choice(["portrait","landscape","anime","superhero","animal","nature","scenery"])
        url = f"https://lexica.art/api/v1/search?q={query}"
        try:
            response = requests.get(url)
            data = response.json()
            images = data.get("images", [])
            if not images:
                return "404 not found error"
            random_image = random.choice(images)
            prompt = random_image.get("prompt")
        except Exception:
            cstr("Unable to establish connection to Lexica API.").error.print()
            prompt = "404 not found error"

        return prompt

```
