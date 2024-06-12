---
tags:
- Prompt
- PromptStyling
---

# Power Prompt - Simple (rgthree)
## Documentation
- Class name: `Power Prompt - Simple (rgthree)`
- Category: `rgthree`
- Output node: `False`

The Power Prompt - Simple node is designed to simplify the process of generating conditioning and text outputs based on a given prompt. It optionally incorporates CLIP embeddings and allows for the insertion of pre-saved prompts or embeddings, streamlining the creation of customized text inputs for further processing.
## Input types
### Required
- **`prompt`**
    - The primary text input for which conditioning and text outputs are generated. It serves as the base content for further modifications or enhancements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`opt_clip`**
    - An optional CLIP model input that, if provided, is used to generate a conditioning output based on the prompt, enhancing the relevance or specificity of the generated text.
    - Comfy dtype: `CLIP`
    - Python dtype: `Optional[str]`
- **`insert_embedding`**
    - Allows for the insertion of a pre-saved embedding by name, enabling the customization of the prompt with specific, pre-defined characteristics.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Optional[str]`
- **`insert_saved`**
    - Permits the inclusion of a pre-saved prompt by filename, facilitating the reuse of previously crafted prompts for new generations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Optional[str]`
## Output types
- **`CONDITIONING`**
    - Comfy dtype: `CONDITIONING`
    - The conditioning output, generated based on the prompt and optionally enhanced by a CLIP model, which can be used for further processing or refinement.
    - Python dtype: `Optional[torch.Tensor]`
- **`TEXT`**
    - Comfy dtype: `STRING`
    - The original or modified prompt text, which can be used as input for subsequent operations or models.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreePowerPromptSimple(RgthreePowerPrompt):

    NAME=get_name('Power Prompt - Simple')
    CATEGORY = get_category()

    @classmethod
    def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
        SAVED_PROMPTS_FILES=folder_paths.get_filename_list('saved_prompts')
        SAVED_PROMPTS_CONTENT=[]
        for filename in SAVED_PROMPTS_FILES:
            with open(folder_paths.get_full_path('saved_prompts', filename), 'r') as f:
                SAVED_PROMPTS_CONTENT.append(f.read())
        return {
            'required': {
                'prompt': ('STRING', {'multiline': True}),
            },
            'optional': {
                "opt_clip": ("CLIP", ),
                'insert_embedding': (['CHOOSE',] + [os.path.splitext(x)[0] for x in folder_paths.get_filename_list('embeddings')],),
                'insert_saved': (['CHOOSE',] + SAVED_PROMPTS_FILES,),
            },
            'hidden': {
                'values_insert_saved': (['CHOOSE'] + SAVED_PROMPTS_CONTENT,),
            }
        }

    RETURN_TYPES = ('CONDITIONING', 'STRING',)
    RETURN_NAMES = ('CONDITIONING', 'TEXT',)
    FUNCTION = 'main'

    def main(self, prompt, opt_clip=None, insert_embedding=None, insert_saved=None, values_insert_saved=None):
        conditioning=None
        if opt_clip != None:
            conditioning = CLIPTextEncode().encode(opt_clip, prompt)[0]

        return (conditioning, prompt)

```
