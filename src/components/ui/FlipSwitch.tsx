export const FlipSwitch = ({
  isOn,
  setIsOff,
}: { isOn: boolean, setIsOff: (params: boolean) => void }) => (
  <>
    <div>
      {isOn
        ? (
          <>
            <button type="button" aria-label="shiny" data-testid="shiny" className="switch-background on" onClick={() => setIsOff(!isOn)}>
              <div aria-label="shiny" className="switch-on" />
            </button>
          </>
        )
        : (
          <>
            <button type="button" aria-label="shiny" data-testid="shiny" className="switch-background off" onClick={() => setIsOff(!isOn)}>
              <div aria-label="shiny" className="switch-off" />
            </button>
          </>
        )}
    </div>
  </>
);