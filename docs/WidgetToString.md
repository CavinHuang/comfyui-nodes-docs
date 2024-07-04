
# Documentation
- Class name: WidgetToString
- Category: KJNodes/text
- Output node: False

这个节点旨在从工作流程中的指定节点提取并返回特定小部件的值。它专注于将小部件值作为字符串检索，如果需要，还可以选择聚合指定节点的所有小部件值。

# Input types
## Required
- id
    - 指定要从中提取小部件值的节点的唯一标识符，在工作流程中识别正确节点时起着至关重要的作用。
    - Comfy dtype: INT
    - Python dtype: int
- widget_name
    - 要检索其值的小部件的名称，决定从节点中提取哪个特定小部件的值。
    - Comfy dtype: STRING
    - Python dtype: str
- return_all
    - 一个布尔标志，当设置为true时，会改变节点的行为，返回指定节点的所有小部件值，而不仅仅是单个小部件的值。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- string
    - 作为字符串提取的小部件值，可能代表单个小部件的值，或者如果'return_all'为true，则代表多个小部件值的连接。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WidgetToString:
    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "id": ("INT", {"default": 0}),
                "widget_name": ("STRING", {"multiline": False}),
                "return_all": ("BOOLEAN", {"default": False}),
            },
            
            "hidden": {"extra_pnginfo": "EXTRA_PNGINFO",
                       "prompt": "PROMPT"},
        }

    RETURN_TYPES = ("STRING", )
    FUNCTION = "get_widget_value"
    CATEGORY = "KJNodes/text"
    DESCRIPTION = """
Selects a node and it's specified widget and outputs the value as a string.  
To see node id's, enable node id display from Manager badge menu.
"""

    def get_widget_value(self, id, widget_name, extra_pnginfo, prompt, return_all=False):
        workflow = extra_pnginfo["workflow"]
        print(workflow)
        results = []
        for node in workflow["nodes"]:
            print(node)
            node_id = node["id"]

            if node_id != id:
                continue

            values = prompt[str(node_id)]
            if "inputs" in values:
                if return_all:
                    results.append(', '.join(f'{k}: {str(v)}' for k, v in values["inputs"].items()))
                elif widget_name in values["inputs"]:
                    v = str(values["inputs"][widget_name])  # Convert to string here
                    return (v, )
                else:
                    raise NameError(f"Widget not found: {id}.{widget_name}")
        if not results:
            raise NameError(f"Node not found: {id}")
        return (', '.join(results).strip(', '), )

```
