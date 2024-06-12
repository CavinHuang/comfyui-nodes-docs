---
tags:
- Text
---

# IF Save Text📝
## Documentation
- Class name: `IF_SaveText`
- Category: `ImpactFrames💥🎞️`
- Output node: `True`

The IF_SaveText node is designed for processing and optionally saving text data related to interactions, such as questions, responses, and negative feedback, into various file formats. It encapsulates the functionality to generate unique identifiers for each interaction, format the interaction data, and save it to a file in a specified format and mode, enhancing data management and retrieval for further analysis or record-keeping.
## Input types
### Required
- **`question_input`**
    - The question part of the interaction, serving as a key input for generating the interaction record.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`response_input`**
    - The response to the question, which is crucial for documenting the interaction.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_input`**
    - Negative feedback or input related to the interaction, providing additional context.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`save_file`**
    - A boolean flag indicating whether to save the interaction data to a file.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`file_format`**
    - Specifies the format of the file (csv, txt, json) in which the interaction data will be saved.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`save_mode`**
    - Determines how the file is saved: create a new file, overwrite an existing file, or append to an existing file.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`Question`**
    - Comfy dtype: `STRING`
    - Returns the question part of the interaction.
    - Python dtype: `str`
- **`Response`**
    - Comfy dtype: `STRING`
    - Returns the response part of the interaction.
    - Python dtype: `str`
- **`Negative`**
    - Comfy dtype: `STRING`
    - Returns the negative feedback or input related to the interaction.
    - Python dtype: `str`
- **`Turn`**
    - Comfy dtype: `STRING`
    - Returns a formatted string containing the interaction's unique identifier, question, response, and negative input.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IFSaveText:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "question_input": ("STRING", {"forceInput": True}),
                "response_input": ("STRING", {"forceInput": True}),
                "negative_input": ("STRING", {"forceInput": True}),
                #"turn": ("STRING", {"forceInput": True}),
            },
            "optional": {                
                "save_file": ("BOOLEAN", {"default": False, "label_on": "Save Text", "label_off": "Don't Save"}),
                "file_format": (["csv", "txt", "json"],),
                "save_mode": (["create", "overwrite", "append"],),
            },
            #"hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
        }

    RETURN_TYPES = ("STRING", "STRING", "STRING", "STRING",)
    RETURN_NAMES = ("Question", "Response", "Negative", "Turn",)
    FUNCTION = "process_text"
    OUTPUT_NODE = True
    CATEGORY = "ImpactFrames💥🎞️"

    def process_text(self, question_input, negative_input, response_input, save_file=False, file_format="txt", save_mode="create"):
        turn_id = str(uuid.uuid4()) 
        turn_data = {"id": turn_id, "question": question_input, "response": response_input, "negative": negative_input}
        if save_file:
            self.save_text_to_file(turn_data, file_format, save_mode)

        turn = f"ID: {turn_id}\nQuestion: {question_input}\nResponse: {response_input}\nNegative: {negative_input}"
        return (question_input, response_input, negative_input, turn)

    def save_text_to_file(self, turn_data, file_format, save_mode):
        save_text_dir = folder_paths.get_output_directory()
        os.makedirs(save_text_dir, exist_ok=True)
        file_path = os.path.join(save_text_dir, f"output.{file_format}")

        file_mode = "w" if save_mode in ["create", "overwrite"] else "a"

        if file_format == "csv":
            with open(file_path, file_mode, newline='') as csvfile:
                fieldnames = ['question', 'response']
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

                if save_mode == "create" or save_mode == "overwrite":
                    writer.writeheader()
                writer.writerow(turn_data)

        elif file_format == "txt":
            with open(file_path, file_mode) as txtfile:
                txtfile.write(f"{turn_data}\n")

        elif file_format == "json":
            with open(file_path, file_mode) as jsonfile:
                if save_mode == "append":
                    try:
                        data = json.load(jsonfile)
                    except:
                        data = []
                    data.append(turn_data)
                    jsonfile.seek(0)
                else:
                    data = [turn_data]
                json.dump(data, jsonfile, indent=4)

    """@classmethod
    def IS_CHANGED(cls, turn_id, question_input, negative_input, response_input, turn, save_file, file_format, save_mode, unique_id=None, prompt=None, extra_pnginfo=None):
        turn = f"ID: {turn_id}\nQuestion: {question_input}\nResponse: {response_input}\nNegative: {negative_input}"
        return {"ui": {"string": [turn]}, "result": (turn,)}"""

```
