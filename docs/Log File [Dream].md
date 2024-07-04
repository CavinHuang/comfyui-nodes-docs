
# Documentation
- Class name: Log File [Dream]
- Category: ✨ Dream/🛠 utils
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Log File [Dream] 节点专门用于在梦境项目中记录和组织与帧计数器及其他指定输入相关的日志条目。它支持基于活动状态的条件日志记录，允许自定义日志文件路径，并可以将日志输出到文件和标准输出（stdout），从而便于实时监控和持久记录保存。

# Input types
## Required
- frame_counter
    - 这是一个必需的输入，它将帧计数集成到日志记录过程中，增强了日志的详细程度和对动画和时间分析的实用性。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- log_directory
    - 指定日志文件将被保存的目录。这允许在文件系统中灵活地管理和组织日志。
    - Comfy dtype: STRING
    - Python dtype: str
- log_filename
    - 定义记录条目的日志文件的名称。这使得可以轻松识别和访问特定的日志文件以进行审查或分析。
    - Comfy dtype: STRING
    - Python dtype: str
- stdout
    - 决定是否将日志条目同时输出到标准输出（stdout），从而实现日志消息的实时监控。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- active
    - 控制日志记录是否处于活动状态。如果为假，则绕过日志记录操作，允许基于运行时条件进行条件日志记录。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- clock_has_i_hours
    - 指示日志条目中时间戳的时钟格式是否应为24小时制。这影响日志中时间记录的可读性和标准化。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- entry_i
    - 可选的日志条目输入，允许将多个日志条目汇总到单个日志文件中。支持最多8个条目，增强了日志的详细程度和组织性。
    - Comfy dtype: LOG_ENTRY
    - Python dtype: LogEntry

# Output types
该节点没有输出类型


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamLogFile:
    NODE_NAME = "Log File"
    ICON = "🗎"
    OUTPUT_NODE = True
    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = ()
    RETURN_NAMES = ()
    FUNCTION = "write"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "log_directory": ("STRING", {"default": comfy_paths.output_directory}),
                "log_filename": ("STRING", {"default": "dreamlog.txt"}),
                "stdout": ("BOOLEAN", {"default": True}),
                "active": ("BOOLEAN", {"default": True}),
                "clock_has_24_hours": ("BOOLEAN", {"default": True}),
            },
            "optional": {
                "entry_0": (LogEntry.ID,),
                "entry_1": (LogEntry.ID,),
                "entry_2": (LogEntry.ID,),
                "entry_3": (LogEntry.ID,),
                "entry_4": (LogEntry.ID,),
                "entry_5": (LogEntry.ID,),
                "entry_6": (LogEntry.ID,),
                "entry_7": (LogEntry.ID,),
            },
        }

    def _path_to_log_file(self, log_directory, logfile):
        if os.path.isabs(logfile):
            return os.path.normpath(os.path.abspath(logfile))
        elif os.path.isabs(log_directory):
            return os.path.normpath(os.path.abspath(os.path.join(log_directory, logfile)))
        elif log_directory:
            return os.path.normpath(os.path.abspath(os.path.join(comfy_paths.output_directory, log_directory, logfile)))
        else:
            return os.path.normpath(os.path.abspath(os.path.join(comfy_paths.output_directory, logfile)))

    def _get_tm_format(self, clock_has_24_hours):
        if clock_has_24_hours:
            return "%a %H:%M:%S"
        else:
            return "%a %I:%M:%S %p"

    def write(self, frame_counter: FrameCounter, log_directory, log_filename, stdout, active, clock_has_24_hours,
              **entries):
        if not active:
            return ()
        log_entry = None
        for i in range(8):
            e = entries.get("entry_" + str(i), None)
            if e is not None:
                if log_entry is None:
                    log_entry = e
                else:
                    log_entry = log_entry.merge(e)
        log_file_path = self._path_to_log_file(log_directory, log_filename)
        ts = _logfile_state.get_section("timestamps").get(log_file_path, 0)
        output_text = list()
        last_t = 0
        for (t, text) in log_entry.get_filtered_entries(ts):
            dt = datetime.datetime.fromtimestamp(t)
            output_text.append("[frame {}/{} (~{}%), timestamp {}]\n{}".format(frame_counter.current_frame + 1,
                                                                               frame_counter.total_frames,
                                                                               round(frame_counter.progress * 100),
                                                                               dt.strftime(self._get_tm_format(
                                                                                   clock_has_24_hours)), text.rstrip()))
            output_text.append("---")
            last_t = max(t, last_t)
        output_text = "\n".join(output_text) + "\n"
        if stdout:
            print(output_text)
        with open(log_file_path, "a", encoding="utf-8") as f:
            f.write(output_text)
        _logfile_state.get_section("timestamps").update(log_file_path, 0, lambda _: last_t)
        return ()

```
