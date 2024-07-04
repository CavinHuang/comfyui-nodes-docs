
# Documentation
- Class name: Get Prompt
- Category: Bmad/dump
- Output node: True
- Repo Ref: https://github.com/bmad4ever/ComfyUI-Bmad-Custom-Nodes

该节点旨在处理和修改用于API交互的给定提示结构，具体做法是移除不必要的元素，并根据指定的输出模式（如打印到控制台或保存到文件）进行调整。该节点在准备提示以供执行或审查方面发挥着关键作用，确保只保留相关数据并以适当的格式呈现。

# Input types
## Required
- api_prompt
    - 指定处理后提示的输出模式，如打印到控制台或保存到文件。这个选择决定了最终提示结构的处理方式，影响节点的执行流程和提示数据的呈现方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
该节点没有输出类型。


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
