export default function BrowserChrome({ url, colored = false }) {
  return (
    <div className={`px-3 py-2 flex items-center gap-1.5 shrink-0 ${colored ? 'bg-[#1e1e1e]' : 'bg-[#2a2a2a]'}`}>
      {colored ? (
        <>
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        </>
      ) : (
        <>
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
        </>
      )}
      <div className={`flex-1 rounded-full h-3.5 mx-1 flex items-center px-2.5 min-w-0 ${colored ? 'bg-white/10' : 'bg-white/6'}`}>
        <span className={`text-base font-body tracking-wide truncate ${colored ? 'text-white/55' : 'text-white/45'}`}>
          {url}
        </span>
      </div>
    </div>
  )
}
