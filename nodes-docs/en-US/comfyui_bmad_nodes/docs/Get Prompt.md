---
tags:
- Prompt
---

# Get Prompt
## Documentation
- Class name: `Get Prompt`
- Category: `Bmad/dump`
- Output node: `True`

The Get Prompt node is designed to process and modify a given prompt structure for API interactions, specifically by removing unnecessary elements and adjusting it according to the specified mode of output (e.g., printing to console or saving to a file). This node plays a crucial role in preparing the prompt for execution or review, ensuring that only relevant data is retained and appropriately formatted.
## Input types
### Required
- **`api_prompt`**
    - Specifies the mode of output for the processed prompt, such as printing to the console or saving to a file. This choice dictates how the final prompt structure is handled, influencing the node's execution flow and the presentation of the prompt data.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GetPrompt:
    prompt_mode = ["print to console", "save to file"]

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "api_prompt": (s.prompt_mode, {"default": "print to console"})
        },
            "hidden": {"prompt": "PROMPT", "unique_id": "UNIQUE_ID"},
        }

    RETURN_TYPES = ()
    FUNCTION = "getPrompt"
    CATEGORY = "Bmad/dump"
    OUTPUT_NODE = True

    def getPrompt(self, api_prompt, prompt, unique_id):
        # changing the original will mess the prompt execution, therefore make a copy
        prompt = copy.deepcopy(prompt)

        # remove this node from the prompt
        this_node = prompt[unique_id]
        del prompt[unique_id]

        # remove widgtes inputs from RequestInputs, only "values" is needed.
        for key in prompt:
            if prompt[key]["class_type"] == "RequestInputs":
                inputs = prompt[key]["inputs"]
                for attribute in list(inputs.keys()):
                    if attribute != "values":
                        del inputs[attribute]
                break  # supposes only 1 RequestInputs node exists

        prompt = {"prompt": prompt}

        # print to console or file
        if api_prompt == "print to console":
            print(json.dumps(prompt))
        elif api_prompt == "save to file":
            # TODO
            # avoid collisions (maybe just name it w/ date/time prefix?)
            # instead of owerriding the file
            file = "prompt.json"
            file = os.path.join(self.output_dir, file)
            with open(file, 'w') as f:
                json.dump(prompt, f, indent=1)
        else:
            pass

        return ()

```
