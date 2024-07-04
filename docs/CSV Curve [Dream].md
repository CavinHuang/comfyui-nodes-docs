
# Documentation
- Class name: CSV Curve [Dream]
- Category: ✨ Dream/🎥 animation/📈 curves
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CSV Curve节点旨在解析和应用基于CSV文件数据的动画曲线。它通过解析CSV文件内容来动态生成动画参数，支持插值和自定义CSV解析过程。该节点能够灵活地将外部数据转化为动画曲线，为创作者提供了一种强大而精确的方法来控制动画的变化和流动。

# Input types
## Required
- frame_counter
    - 该参数用于跟踪动画的当前帧，对于动画曲线与整体动画序列的时间同步至关重要。它确保了曲线的应用与动画进度保持一致。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- csvfile
    - 指定用于生成动画曲线的CSV文件路径。这使得节点能够动态解释和应用文件中包含的数据，为动画提供灵活的控制源。
    - Comfy dtype: STRING
    - Python dtype: str
- first_column_type
    - 决定CSV文件的第一列是代表秒还是帧，这影响了数据在动画时间上下文中的解释方式。正确设置此参数对于准确映射数据到动画时间线至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- interpolate
    - 控制是否对CSV文件中的数据点之间进行插值。启用插值可以生成更平滑的动画曲线，提高动画的流畅度和自然度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- csv_dialect
    - 指定CSV文件的方言，使节点能够准确解析具有不同格式约定的文件。这增强了节点的兼容性，使其能处理各种CSV格式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
- FLOAT
    - CSV Curve节点生成的浮点值，代表动画曲线上的一个点。这提供了高精度的动画参数控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- INT
    - 生成的动画曲线点的整数表示，为那些需要离散值的动画参数提供了另一种精度级别的选择。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamCSVCurve:
    NODE_NAME = "CSV Curve"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "csvfile": ("STRING", {"default": "", "multiline": False}),
                "first_column_type": (["seconds", "frames"],),
                "interpolate": (["true", "false"],),
                "csv_dialect": (csv.list_dialects(),)
            },
        }

    CATEGORY = NodeCategories.ANIMATION_CURVES
    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("FLOAT", "INT")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def _row_yield(self, file, csv_dialect):
        prev_row = None
        for row in csv.reader(file, dialect=csv_dialect):
            if len(row) == 2 and _is_as_float(row[0]) and _is_as_float(row[1]):
                row = list(map(float, row))
                yield (prev_row, row)
                prev_row = row
        if prev_row is not None:
            yield (prev_row, None)

    def result(self, csvfile, frame_counter: FrameCounter, first_column_type, interpolate, csv_dialect):
        interpolate = interpolate == "true"

        def _first_col_to_frame(v: float):
            if first_column_type == "frames":
                return round(v)
            else:
                return round(v * frame_counter.frames_per_second)

        with open(csvfile) as f:
            for (prev, current) in self._row_yield(f, csv_dialect):
                if prev is None and frame_counter.current_frame < _first_col_to_frame(current[0]):
                    # before first row
                    return (current[1], int(round(current[1])))
                if current is None:
                    # after last row
                    return (prev[1], int(round(prev[1])))
                if prev is not None and current is not None:
                    frame1 = _first_col_to_frame(prev[0])
                    value1 = prev[1]
                    frame2 = _first_col_to_frame(current[0])
                    value2 = current[1]
                    if frame1 <= frame_counter.current_frame and interpolate and frame2 > frame_counter.current_frame:
                        offset = (frame_counter.current_frame - frame1) / float(frame2 - frame1)
                        v = value1 * (1.0 - offset) + value2 * offset
                        return (v, int(round(v)))
                    elif frame1 <= frame_counter.current_frame and frame2 > frame_counter.current_frame:
                        return (value1, int(round(value1)))
        return (0.0, 0)

```
