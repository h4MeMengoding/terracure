import { hmiRules } from "@/data/hmi-rules";

const priorityTone = {
  hydrology: "bg-[#F1EEFF]",
  ph: "bg-[#DDF7E7]",
  ec: "bg-[#F2F2DE]",
  early: "bg-[#FEFFD8]",
  vegetative: "bg-[#F7DFA4]",
  generative: "bg-[#FCE8E9]"
};

export function HmiTable() {
  return (
    <div className="surface-card overflow-hidden">
      <div className="hmi-scroll overflow-x-auto">
        <table className="min-w-[680px] border-collapse text-left text-[13px] leading-5 text-[#151A17]">
          <caption className="sr-only">Aturan keputusan HMI Terracure berdasarkan prioritas, parameter terbaca, deklarasi kondisi, dan rekomendasi taktis.</caption>
          <thead>
            <tr className="bg-[#F5DEA0] text-center text-[13px] font-extrabold">
              <th scope="col" className="w-[150px] border border-[#EEEBD9] px-3 py-3">Skenario Prioritas</th>
              <th scope="col" className="w-[210px] border border-[#EEEBD9] px-3 py-3">Parameter yang Terbaca</th>
              <th scope="col" className="w-[150px] border border-[#EEEBD9] px-3 py-3">Deklarasi Kondisi</th>
              <th scope="col" className="w-[170px] border border-[#EEEBD9] px-3 py-3">Rekomendasi Taktis</th>
            </tr>
          </thead>
          <tbody>
            {hmiRules.flatMap((group) =>
              group.rows.map((row, rowIndex) => (
                <tr key={`${group.priority}-${row.parameter}`} className="bg-white align-top">
                  {rowIndex === 0 ? (
                    <th scope="rowgroup" rowSpan={group.rows.length} className={`border border-[#EEEBD9] px-3 py-4 text-left text-sm font-extrabold leading-5 ${priorityTone[group.tone]}`}>
                      {group.priority}
                    </th>
                  ) : null}
                  <td className="border border-[#EEEBD9] px-3 py-3 font-medium">{row.parameter}</td>
                  <td className="border border-[#EEEBD9] px-3 py-3 font-medium">{row.declaration}</td>
                  <td className="border border-[#EEEBD9] px-3 py-3 font-medium">{row.recommendation}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
