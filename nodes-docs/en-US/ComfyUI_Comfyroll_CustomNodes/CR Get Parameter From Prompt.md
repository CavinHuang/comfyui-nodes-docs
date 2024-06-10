---
tags:
- Prompt
---

# ⚙️ CR Get Parameter From Prompt
## Documentation
- Class name: `CR Get Parameter From Prompt`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/⚙️ Other`
- Output node: `False`

This node is designed to extract specific parameters from a given prompt based on predefined criteria, such as the presence of certain strings or patterns. It aims to simplify the process of parameter extraction from text inputs, enhancing the efficiency and accuracy of data retrieval.
## Input types
### Required
- **`prompt`**
    - The 'prompt' parameter represents the text input from which the node attempts to extract specific parameters. It plays a crucial role in determining the node's execution and results, as the effectiveness of parameter extraction directly depends on the content and structure of the input text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`search_string`**
    - The 'search_string' parameter specifies the particular string or pattern the node is looking for within the prompt. Its presence and characteristics significantly influence the extraction process, guiding the node in identifying and retrieving the relevant parameters.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`prompt`**
    - Comfy dtype: `STRING`
    - The 'prompt' output parameter encapsulates the extracted parameters from the input text, providing a structured representation of the data retrieved. It is significant for downstream processes that require specific information extracted from textual inputs.
    - Python dtype: `str`
- **`text`**
    - Comfy dtype: `*`
    - The 'text' output parameter contains the textual content extracted based on the 'search_string' criteria. It is crucial for further processing or analysis that requires the specific text identified within the prompt.
    - Python dtype: `str`
- **`float`**
    - Comfy dtype: `FLOAT`
    - The 'float' output parameter represents numerical values extracted from the prompt, offering a quantifiable aspect of the data retrieved for subsequent operations.
    - Python dtype: `float`
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The 'boolean' output parameter indicates the presence or absence of the 'search_string' within the prompt, providing a binary assessment of the extraction success.
    - Python dtype: `bool`
- **`show_help`**
    - Comfy dtype: `STRING`
    - The 'show_help' output parameter offers guidance or additional information related to the node's operation, assisting users in understanding or troubleshooting the parameter extraction process.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_GetParameterFromPrompt:

    @classmethod
    def INPUT_TYPES(cls):
           
        return {
            "required": {
                "prompt": ("STRING", {"multiline": True, "default": "prompt", "forceInput": True}),
                "search_string": ("STRING", {"multiline": False, "default": "!findme"}),
            }
        }
    
    RETURN_TYPES =("STRING", any_type, "FLOAT", "BOOLEAN", "STRING", )
    RETURN_NAMES =("prompt",  "text", "float", "boolean", "show_help", )
    FUNCTION = "get_string"    
    CATEGORY = icons.get("Comfyroll/Utils/Other")

    def get_string(self, prompt, search_string):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-find-string-in-prompt"    

        return_string = ""
        return_value = 0
        return_boolean = False
        return_prompt = prompt
        
        index = prompt.find(search_string)
        if index != -1:
            # Check if there is a quote after the search_string
            if prompt[index + len(search_string)] == '=':
                if prompt[index + len(search_string) + 1] == '"':
                    # Extract text between quotes
                    start_quote = index + len(search_string) + 2
                    end_quote = prompt.find('"', start_quote + 1)
                    if end_quote != -1:
                        return_string = prompt[start_quote:end_quote]
                        print(return_string)
                else:        
                    # Find the next space after the search_string
                    space_index = prompt.find(" ", index + len(search_string))
                    if space_index != -1:
                        return_string = prompt[index + len(search_string):space_index]
                    else:
                        return_string = prompt[index + len(search_string):]
            else:
                return_string = search_string[1:]

        if return_string == "":
            return (return_prompt, return_string, return_value, return_boolean, show_help, )
        
        if return_string.startswith("="):
            return_string = return_string[1:]
 
        return_boolean = return_string.lower() == "true"    

        # Check if return_string is an integer or a float
        try:
            return_value = int(return_string)
        except ValueError:
            try:
                return_value = float(return_string)
            except ValueError:
                return_value = 0

        remove_string = " " + search_string + "=" + return_string
        
        # The return_prompt should have the search_string and the return_text removed
        return_prompt = prompt.replace(remove_string, "")
         
        return (return_prompt, return_string, return_value, return_boolean, show_help, )

```
