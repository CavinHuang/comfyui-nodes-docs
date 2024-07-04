
# Documentation
- Class name: CSV Generator [Dream]
- Category: ✨ Dream/🎥 animation/📈 curves
- Output node: True
- Repo Ref: https://github.com/xXAdonesXx/NodeGallery

CSV Generator节点专门用于创建和追加动画曲线数据到CSV文件。它可以初始化或更新CSV文件，记录帧数和对应的数值数据，并支持自定义CSV方言以实现灵活的文件格式化。

# Input types
## Required
- frame_counter
    - 用于跟踪动画中的当前帧数，确保在CSV中记录的时间数据与数值数据准确对应。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- value
    - 指定要记录到CSV文件中的数值，是构成动画曲线数据点的关键元素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- csvfile
    - CSV文件的路径，用于创建或更新文件。这是存储动画曲线数据的主要载体。
    - Comfy dtype: STRING
    - Python dtype: str
- csv_dialect
    - 定义CSV文件的格式规则，允许自定义文件的结构和语法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
该节点没有输出类型。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamCSVGenerator:
    NODE_NAME = "CSV Generator"
    ICON = "⌗"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "value": ("FLOAT", {"forceInput": True, "default": 0.0}),
                "csvfile": ("STRING", {"default": "", "multiline": False}),
                "csv_dialect": (csv.list_dialects(),)
            },
        }

    CATEGORY = NodeCategories.ANIMATION_CURVES
    RETURN_TYPES = ()
    RETURN_NAMES = ()
    FUNCTION = "write"
    OUTPUT_NODE = True

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def write(self, csvfile, frame_counter: FrameCounter, value, csv_dialect):
        if frame_counter.is_first_frame and csvfile:
            with open(csvfile, 'w', newline='') as csvfile:
                csvwriter = csv.writer(csvfile, dialect=csv_dialect)
                csvwriter.writerow(['Frame', 'Value'])
                csvwriter.writerow([frame_counter.current_frame, str(value)])
        else:
            with open(csvfile, 'a', newline='') as csvfile:
                csvwriter = csv.writer(csvfile, dialect=csv_dialect)
                csvwriter.writerow([frame_counter.current_frame, str(value)])
        return ()

```
